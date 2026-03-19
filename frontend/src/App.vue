<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { DANMAKU_KEYS } from './i18n'

const API = import.meta.env.VITE_API_URL || ''
const { t, locale } = useI18n()

watch(locale, () => { document.title = t('title') }, { immediate: true })

const todayCount = ref(0)
const dialogVisible = ref(false)
const myRank = ref(0)
const isLiking = ref(false)
const hasLiked = ref(false)

// 弹幕系统 — 存 i18n key，切语言自动跟随
interface Bullet {
  id: number
  key: string
  top: number
  duration: number
  color: string
}

const bullets = ref<Bullet[]>([])
let bulletId = 0
let danmakuTimer: number | undefined

const neonColors = [
  'rgba(0, 240, 255, 0.7)',
  'rgba(255, 45, 149, 0.6)',
  'rgba(176, 38, 255, 0.6)',
  'rgba(240, 255, 0, 0.5)',
  'rgba(0, 240, 255, 0.5)',
  'rgba(255, 45, 149, 0.4)',
  'rgba(224, 224, 255, 0.4)',
]

function spawnBullet() {
  const key = DANMAKU_KEYS[Math.floor(Math.random() * DANMAKU_KEYS.length)]
  const top = Math.random() * 85 + 5
  const duration = Math.random() * 10 + 8
  const color = neonColors[Math.floor(Math.random() * neonColors.length)]
  const id = bulletId++

  bullets.value.push({ id, key, top, duration, color })

  setTimeout(() => {
    bullets.value = bullets.value.filter(b => b.id !== id)
  }, duration * 1000)
}

function startDanmaku() {
  // 初始密集撒 15 条
  for (let i = 0; i < 15; i++) {
    setTimeout(spawnBullet, i * 300)
  }
  // 每 300ms 生成一条，保持屏幕密集
  danmakuTimer = window.setInterval(spawnBullet, 300)
}

const STORAGE_KEY = 'earth_online_like'
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

interface LikeRecord {
  rank: number
  timestamp: number
}

function loadLikeRecord(): LikeRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const record: LikeRecord = JSON.parse(raw)
    if (Date.now() - record.timestamp > TWENTY_FOUR_HOURS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return record
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function saveLikeRecord(rank: number) {
  const record: LikeRecord = { rank, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

function checkLiked() {
  const record = loadLikeRecord()
  if (record) {
    hasLiked.value = true
    myRank.value = record.rank
  }
}

function toggleLocale() {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}

async function fetchCount() {
  try {
    const { data } = await axios.get(`${API}/api/likes`)
    todayCount.value = data.count
  } catch { /* silent */ }
}

async function handleLike() {
  if (isLiking.value || hasLiked.value) return
  isLiking.value = true
  try {
    const { data } = await axios.post(`${API}/api/like`)
    myRank.value = data.count
    todayCount.value = data.count
    saveLikeRecord(data.count)
    hasLiked.value = true
    dialogVisible.value = true
  } finally {
    isLiking.value = false
  }
}

function closeDialog() {
  dialogVisible.value = false
}

onMounted(() => {
  checkLiked()
  fetchCount()
  startDanmaku()
})

onUnmounted(() => {
  if (danmakuTimer) clearInterval(danmakuTimer)
})
</script>

<template>
  <div class="app">
    <!-- 弹幕层 -->
    <div class="danmaku-layer">
      <span
        v-for="b in bullets"
        :key="b.id"
        class="danmaku-item"
        :style="{
          top: b.top + '%',
          animationDuration: b.duration + 's',
          color: b.color,
          textShadow: '0 0 8px ' + b.color,
        }"
      >{{ t(b.key) }}</span>
    </div>

    <div class="top-left">
      <span class="count-label">{{ t('todayLikes') }}</span>
      <span class="count-number">{{ todayCount }}</span>
    </div>

    <div class="top-right">
      <a class="github-link" href="https://github.com/game-ark/earth-oline" target="_blank" rel="noopener">
        <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        GitHub
      </a>
      <button class="lang-btn" @click="toggleLocale">
        {{ locale === 'zh' ? 'EN' : '中文' }}
      </button>
    </div>

    <div class="center">
      <h1 class="hero-title">{{ t('title') }}</h1>
      <p class="hero-subtitle">{{ t('subtitle') }}</p>

      <button
        class="like-btn"
        :class="{ pressing: isLiking, liked: hasLiked }"
        :disabled="isLiking || hasLiked"
        @click="handleLike"
      >
        <span class="like-icon">{{ hasLiked ? '✅' : '👍' }}</span>
        <span class="like-text">{{ hasLiked ? t('alreadyLikedWithRank', { n: myRank }) : t('likeButton') }}</span>
      </button>

      <p class="hero-desc">{{ t('description') }}</p>
      <p class="hero-footer">{{ t('footer') }}</p>
    </div>

    <Teleport to="body">
      <div v-if="dialogVisible" class="overlay" @click.self="closeDialog">
        <div class="dialog">
          <h2>{{ t('dialogTitle') }}</h2>
          <p>{{ t('dialogMessage', { n: myRank }) }}</p>
          <button class="dialog-btn" @click="closeDialog">{{ t('close') }}</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
