/* POST /api/track {type:'visit'|'chat'} — lightweight anonymous analytics event */
const B = require('../lib/backend');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  try {
    const { type } = await B.readBody(req);
    if (type !== 'visit' && type !== 'chat') return B.json(res, 400, { ok: false });
    const day = new Date().toISOString().slice(0, 10);
    await B.supa().from('events').insert({ type, day });
    return B.json(res, 200, { ok: true });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
