/* GET /api/admin/data — full site data incl. hidden items + bookings + analytics (session required) */
const B = require('../../lib/backend');
module.exports = async (req, res) => {
  if (!B.sessionValid(req)) return B.json(res, 401, { ok: false });
  try {
    const db = B.supa();
    const [svc, gal, tst, kv, bk, ev] = await Promise.all([
      db.from('services').select('data'),
      db.from('gallery').select('data'),
      db.from('testimonials').select('data'),
      db.from('kv').select('key,value').in('key', ['content', 'settings']),
      db.from('bookings').select('data').order('created_at', { ascending: false }).limit(500),
      db.from('events').select('type,day').order('id', { ascending: false }).limit(5000),
    ]);
    if (svc.error || gal.error || tst.error || kv.error || bk.error || ev.error) throw new Error('db');
    const kvMap = {};
    (kv.data || []).forEach(r => { kvMap[r.key] = r.value; });
    const rows = d => (d || []).map(r => r.data);
    const visitsByDay = {}, bookingsByService = {};
    let visits = 0, chatOpens = 0;
    (ev.data || []).forEach(e => {
      if (e.type === 'visit') { visits++; visitsByDay[e.day] = (visitsByDay[e.day] || 0) + 1; }
      else if (e.type === 'chat') chatOpens++;
    });
    const bookings = rows(bk.data);
    bookings.forEach(b => { if (b.serviceId) bookingsByService[b.serviceId] = (bookingsByService[b.serviceId] || 0) + 1; });
    return B.json(res, 200, {
      content: kvMap.content || {},
      settings: kvMap.settings || {},
      services: rows(svc.data),
      gallery: rows(gal.data),
      testimonials: rows(tst.data),
      bookings,
      analytics: { visits, visitsByDay, bookingsTotal: bookings.length, bookingsByService, chatOpens },
    });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
