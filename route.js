// api/route.js

export default async function handler(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: 'Missing start or end coordinates' });
  }

  const API_KEY = '5b3ce3597851110001cf6248c2716cb591d84e3d98e2473a6e037af4';
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start}&end=${end}`;

  try {
    const orsRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    const data = await orsRes.json();
    if (!orsRes.ok) {
      return res.status(orsRes.status).json({ error: 'ORS error', details: data });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
