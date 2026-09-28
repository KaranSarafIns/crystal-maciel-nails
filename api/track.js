/* POST /api/track {type:'visit'|'chat'} — lightweight anonymous analytics event */
const B = require('../lib/backend');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  try {
    const ip = B.clientIp(req);
    const limited = await B.rateLimitHit('track', ip, 60, 10 * 60 * 1000)
      || await B.rateLimitHit('track-global', 'all', 600, 10 * 60 * 1000);
    if (limited) return B.json(res, 429, { ok: false, error: 'rate_limited' });
    await B.rateLimitAdd('track', ip, 10 * 60 * 1000);
    await B.rateLimitAdd('track-global', 'all', 10 * 60 * 1000);
    const { type } = await B.readBody(req);
    if (type !== 'visit' && type !== 'chat') return B.json(res, 400, { ok: false });
    const day = new Date().toISOString().slice(0, 10);
    await B.supa().from('events').insert({ type, day });
    return B.json(res, 200, { ok: true });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
