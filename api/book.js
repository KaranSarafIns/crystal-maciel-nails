/* POST /api/book — public booking submission -> shared bookings table */
const crypto = require('crypto');
const B = require('../lib/backend');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return B.json(res, 405, { ok: false });
  try {
    const b = await B.readBody(req);
    const name = String(b.name || '').trim();
    const phone = String(b.phone || '').trim();
    if (name.length < 2 || phone.replace(/\D/g, '').length < 7) return B.json(res, 400, { ok: false, error: 'invalid' });
    const code = 'CM-' + crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 4);
    const row = {
      id: crypto.randomUUID(), code,
      serviceId: String(b.serviceId || ''), serviceName: String(b.serviceName || ''),
      price: +b.price || 0, date: String(b.date || ''), time: String(b.time || ''),
      name, phone, notes: String(b.notes || '').slice(0, 500),
      status: 'pending', createdAt: new Date().toISOString(),
    };
    const { error } = await B.supa().from('bookings').insert({ id: row.id, data: row });
    if (error) throw error;
    return B.json(res, 200, { ok: true, code, id: row.id });
  } catch (e) { return B.json(res, 500, { ok: false }); }
};
