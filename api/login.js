/* POST /api/login {password} — server-side password check, sets httpOnly session cookie */
const B = require('../lib/backend');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  try {
    const { password } = await B.readBody(req);
    const { data, error } = await B.supa().from('kv').select('value').eq('key', 'auth').single();
    if (error || !data || !data.value) return B.json(res, 500, { ok: false });
    if (!B.verifyPw(password || '', data.value.salt, data.value.hash)) return B.json(res, 401, { ok: false });
    B.setSessionCookie(res, B.sessionToken());
    return B.json(res, 200, { ok: true });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
