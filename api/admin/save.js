/* POST /api/admin/save {table, rows} — replace a collection (session required).
   Tables: services | gallery | testimonials | bookings | kv (kv rows: [{key:'content'|'settings', value}]) */
const B = require('../../lib/backend');
const TABLES = { services: 1, gallery: 1, testimonials: 1, bookings: 1 };
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  if (!B.sessionValid(req)) return B.json(res, 401, { ok: false });
  try {
    const { table, rows } = await B.readBody(req);
    const db = B.supa();
    if (table === 'kv') {
      for (const r of (rows || [])) {
        if (!r || (r.key !== 'content' && r.key !== 'settings')) continue;
        const { error } = await db.from('kv').upsert({ key: r.key, value: r.value }, { onConflict: 'key' });
        if (error) throw error;
      }
      return B.json(res, 200, { ok: true });
    }
    if (!TABLES[table]) return B.json(res, 400, { ok: false });
    const list = (rows || []).filter(r => r && r.id).map(r => ({ id: String(r.id), data: r }));
    const { error: delErr } = await db.from(table).delete().neq('id', '__none__');
    if (delErr) throw delErr;
    if (list.length) {
      const { error } = await db.from(table).insert(list);
      if (error) throw error;
    }
    return B.json(res, 200, { ok: true });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
