# 🌍 Earth Online

**[中文版](#-地球-online)**

We are all characters in Earth Online.

Every day, you can press the like button once — not for anyone else, but for yourself. Each like is a spiritual interaction with the player behind your character — a gentle reminder to pay attention to your own journey, and to look forward to a better life ahead.

This is not just a counter. It's a moment of connection between you and the one who controls your fate.

Be kind to yourself today.

## Features

- 👍 One like per day — a daily ritual of self-affirmation
- 🌐 i18n support (English / 中文), auto-detected by browser locale
- ⚡ Redis atomic counter (INCR) — no concurrency issues
- 🎮 Cyberpunk UI — scanlines, neon glow, rotating halos, perspective grid

## Tech Stack

- Frontend: Vue 3 + TypeScript + Vite + vue-i18n
- Backend: Node.js + Express
- Storage: Redis

## Getting Started

```bash
# 1. Start Redis
redis-server

# 2. Start backend
cd server
npm install
REDIS_PASSWORD=yourpassword npm start

# 3. Start frontend
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` to `http://localhost:3000`.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REDIS_HOST` | `127.0.0.1` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | _(empty)_ | Redis password |

---

# 🌍 地球 Online

**[English Version](#-earth-online)**

我们都是地球Online里的角色。

每天，你可以按一次点赞按钮——不是为了别人，而是为了自己。每一次点赞，都是在和操纵我们角色的玩家完成一次精神互动——提醒TA多关注自己的处境，期待未来的生活可以更好。

这不只是一个计数器，而是你和掌控你命运的那个人之间的一次连接。

今天，也请对自己好一点。

## 功能

- 👍 每人每天一次点赞——每日自我肯定的仪式
- 🌐 国际化支持（中文 / English），根据浏览器语言自动切换
- ⚡ Redis 原子计数（INCR）——无并发问题
- 🎮 赛博朋克界面——扫描线、霓虹光效、旋转光环、透视网格

## 技术栈

- 前端：Vue 3 + TypeScript + Vite + vue-i18n
- 后端：Node.js + Express
- 存储：Redis

## 快速开始

```bash
# 1. 启动 Redis
redis-server

# 2. 启动后端
cd server
npm install
REDIS_PASSWORD=你的密码 npm start

# 3. 启动前端
cd frontend
npm install
npm run dev
```

前端开发服务器会将 `/api` 代理到 `http://localhost:3000`。

## 环境变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `REDIS_HOST` | `127.0.0.1` | Redis 地址 |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `REDIS_PASSWORD` | _(空)_ | Redis 密码 |
