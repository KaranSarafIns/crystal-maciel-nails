/* Generates backend/schema.sql from the real seed data in js/app.js.
   Run: node tools/build-schema.cjs
   It extracts `const I18N={...}` and `function seedStore(){...}` from app.js,
   evaluates them in a sandbox (both are pure data, no DOM), and emits SQL. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const appSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

/* balanced-brace scanner that respects strings and comments */
function extractBlock(src, startIdx) {
  let i = src.indexOf('{', startIdx);
  if (i < 0) throw new Error('no brace');
  let depth = 0, inStr = null, esc = false, inLine = false, inBlock = false;
  for (let j = i; j < src.length; j++) {
    const c = src[j], n = src[j + 1];
    if (inLine) { if (c === '\n') inLine = false; continue; }
    if (inBlock) { if (c === '*' && n === '/') { inBlock = false; j++; } continue; }
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '/' && n === '/') { inLine = true; j++; continue; }
    if (c === '/' && n === '*') { inBlock = true; j++; continue; }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(i, j + 1); }
  }
  throw new Error('unbalanced braces');
}

const i18nIdx = appSrc.indexOf('const I18N=');
if (i18nIdx < 0) throw new Error('I18N not found');
const i18nSrc = 'const I18N=' + extractBlock(appSrc, i18nIdx) + ';';

const seedIdx = appSrc.indexOf('function seedStore(){');
if (seedIdx < 0) throw new Error('seedStore not found');
const seedBody = extractBlock(appSrc, seedIdx); // {return {...};}
const seedSrc = 'function seedStore()' + seedBody;

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(i18nSrc + '\n' + seedSrc + '\nthis.__seed = seedStore();', sandbox);
const seed = sandbox.__seed;
if (!seed || !seed.services || !seed.content) throw new Error('seed eval failed');

const sqlStr = s => "'" + String(s).replace(/'/g, "''") + "'";
const j = o => sqlStr(JSON.stringify(o));

/* default admin password hash (scrypt) for 'crystal2026' — change in Settings after first login */
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync('crystal2026', salt, 64).toString('hex');

const lines = [];
lines.push('-- Crystal Maciel Nails — backend schema (generated, do not hand-edit)');
lines.push('-- Run once in Supabase SQL Editor. Safe to re-run: seeds only fill empty tables.');
lines.push('');
for (const t of ['services', 'gallery', 'testimonials']) {
  lines.push(`create table if not exists ${t}(id text primary key, data jsonb not null);`);
}
lines.push(`create table if not exists bookings(id text primary key, data jsonb not null, created_at timestamptz default now());`);
lines.push(`create table if not exists kv("key" text primary key, value jsonb not null);`);
lines.push(`create table if not exists events(id bigserial primary key, type text not null, day text not null, created_at timestamptz default now());`);
lines.push('');
for (const t of ['services', 'gallery', 'testimonials', 'bookings', 'kv', 'events']) {
  lines.push(`alter table ${t} enable row level security;`);
}
lines.push('-- no public policies: only the service_role key (used by /api/*) can read/write');
lines.push('');
for (const s of seed.services) lines.push(`insert into services(id,data) values(${sqlStr(s.id)},${j(s)}::jsonb) on conflict(id) do nothing;`);
for (const g of seed.gallery) lines.push(`insert into gallery(id,data) values(${sqlStr(g.id)},${j(g)}::jsonb) on conflict(id) do nothing;`);
for (const t of seed.testimonials) lines.push(`insert into testimonials(id,data) values(${sqlStr(t.id)},${j(t)}::jsonb) on conflict(id) do nothing;`);
lines.push(`insert into kv("key",value) values('content',${j(seed.content)}::jsonb) on conflict("key") do nothing;`);
lines.push(`insert into kv("key",value) values('settings',${j(seed.settings)}::jsonb) on conflict("key") do nothing;`);
lines.push(`insert into kv("key",value) values('auth',${j({ salt, hash })}::jsonb) on conflict("key") do nothing;`);
lines.push('');

fs.writeFileSync(path.join(__dirname, '..', 'backend', 'schema.sql'), lines.join('\n'));
console.log('wrote backend/schema.sql',
  '| services:', seed.services.length,
  '| gallery:', seed.gallery.length,
  '| testimonials:', seed.testimonials.length);
