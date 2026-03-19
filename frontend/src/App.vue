<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || ''
const { t, locale } = useI18n()

const todayCount = ref(0)
const dialogVisible = ref(false)
const myRank = ref(0)
const isLiking = ref(false)
const hasLiked = ref(false)

function getToday() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function checkLiked() {
  hasLiked.value = localStorage.getItem(`liked:${getToday()}`) === '1'
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
    localStorage.setItem(`liked:${getToday()}`, '1')
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
})
</script>

<template>
  <div class="app">
    <div class="top-left">
      <span class="count-label">{{ t('todayLikes') }}</span>
      <span class="count-number">{{ todayCount }}</span>
    </div>

    <button class="lang-btn" @click="toggleLocale">
      {{ locale === 'zh' ? 'EN' : '中文' }}
    </button>

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
        <span class="like-text">{{ hasLiked ? t('alreadyLiked') : t('likeButton') }}</span>
      </button>

      <p class="hero-desc">{{ t('description') }}</p>
      <p class="hero-footer">{{ t('footer') }}</p>
    </div>

    <Teleport to="body">
      <div v-if="dialogVisible" class="overlay" @click.self="closeDialog">
        <div class="dialog">
          <h2>{{ t('dialogTitle') }} 🎉</h2>
          <p>{{ t('dialogMessage', { n: myRank }) }}</p>
          <button class="dialog-btn" @click="closeDialog">{{ t('close') }}</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
