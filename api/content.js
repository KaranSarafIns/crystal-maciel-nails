/* GET /api/content — public site data (only visible items; no secrets) */
const B = require('../lib/backend');
const DEFAULT_HOURS = {
  days: {
    mon: { open: false, from: '10:00', to: '19:00' },
    tue: { open: true, from: '10:00', to: '19:00' },
    wed: { open: true, from: '10:00', to: '19:00' },
    thu: { open: true, from: '10:00', to: '19:00' },
    fri: { open: true, from: '10:00', to: '19:00' },
    sat: { open: true, from: '10:00', to: '19:00' },
    sun: { open: true, from: '11:00', to: '17:00' },
  },
  off: [],
};
module.exports = async (req, res) => {
  try {
    const db = B.supa();
    const [svc, gal, tst, kv] = await Promise.all([
      db.from('services').select('data'),
      db.from('gallery').select('data'),
      db.from('testimonials').select('data'),
      db.from('kv').select('key,value').in('key', ['content', 'settings', 'hours']),
    ]);
    if (svc.error || gal.error || tst.error || kv.error) throw new Error('db');
    const kvMap = {};
    (kv.data || []).forEach(r => { kvMap[r.key] = r.value; });
    const pub = rows => (rows || []).map(r => r.data).filter(d => d && !d.off);
    return B.json(res, 200, {
      content: kvMap.content || {},
      settings: kvMap.settings || {},
      hours: kvMap.hours || DEFAULT_HOURS,
      services: pub(svc.data),
      gallery: pub(gal.data),
      testimonials: pub(tst.data),
    });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
