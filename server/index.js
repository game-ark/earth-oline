const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');

const app = express();
const PORT = 3000;

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `likes:${y}-${m}-${d}`;
}

app.use(cors());
app.use(express.json());

app.get('/api/likes', async (_req, res) => {
  try {
    const count = await redis.get(getTodayKey());
    res.json({ count: Number(count) || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/like', async (_req, res) => {
  try {
    const key = getTodayKey();
    const count = await redis.incr(key);
    await redis.expire(key, 48 * 60 * 60);
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
