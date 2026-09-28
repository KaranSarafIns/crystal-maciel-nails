/* POST /api/admin/password {currentPassword, newPassword} — change admin password (session required) */
const B = require('../../lib/backend');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  if (!B.sessionValid(req)) return B.json(res, 401, { ok: false });
  try {
    const { currentPassword, newPassword } = await B.readBody(req);
    if (!newPassword || String(newPassword).length < 6) return B.json(res, 400, { ok: false });
    const db = B.supa();
    const { data, error } = await db.from('kv').select('value').eq('key', 'auth').single();
    if (error || !data || !data.value) return B.json(res, 500, { ok: false });
    if (!B.verifyPw(currentPassword || '', data.value.salt, data.value.hash)) return B.json(res, 401, { ok: false });
    const { salt, hash } = B.hashPw(newPassword);
    const { error: upErr } = await db.from('kv').upsert({ key: 'auth', value: { salt, hash } }, { onConflict: 'key' });
    if (upErr) throw upErr;
    return B.json(res, 200, { ok: true });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
