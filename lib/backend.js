/* Shared server helpers for /api/* (Vercel serverless, Node).
   All Supabase access uses the service_role key — it never leaves the server.
   Admin sessions are HMAC-signed tokens in an httpOnly cookie. */
const crypto = require('crypto');

let _supa = null;
function supa() {
  if (_supa) return _supa;
  const { createClient } = require('@supabase/supabase-js');
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('missing SUPABASE_URL / SUPABASE_SERVICE_KEY');
  _supa = createClient(url, key, { auth: { persistSession: false } });
  return _supa;
}

function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let b = '';
    req.on('data', c => { b += c; if (b.length > 1e6) { req.destroy(); reject(new Error('too large')); } });
    req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

function sessionToken() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('missing SESSION_SECRET');
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 12 * 3600 * 1000 })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return payload + '.' + sig;
}

function sessionValid(req) {
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret) return false;
    const m = (req.headers.cookie || '').match(/cmn_sess=([^;]+)/);
    if (!m) return false;
    const parts = m[1].split('.');
    if (parts.length !== 2) return false;
    const [payload, sig] = parts;
    const want = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
    if (sig.length !== want.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return false;
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now();
  } catch (e) { return false; }
}

function setSessionCookie(res, tok) {
  res.setHeader('Set-Cookie', `cmn_sess=${tok}; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax; Secure`);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'cmn_sess=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure');
}

function verifyPw(pw, salt, hash) {
  try {
    const h = crypto.scryptSync(String(pw), salt, 64).toString('hex');
    if (h.length !== hash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(h, 'hex'), Buffer.from(hash, 'hex'));
  } catch (e) { return false; }
}

function hashPw(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(pw), salt, 64).toString('hex');
  return { salt, hash };
}

module.exports = { supa, json, readBody, sessionToken, sessionValid, setSessionCookie, clearSessionCookie, verifyPw, hashPw };
