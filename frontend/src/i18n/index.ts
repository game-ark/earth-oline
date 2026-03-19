import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    todayLikes: '本日点赞人数',
    likeButton: '为自己点赞',
    alreadyLiked: '今日已点赞 ✓',
    dialogTitle: '点赞成功',
    dialogMessage: '你是今日第 {n} 个给自己点赞的人',
    alreadyLikedMessage: '你今天已经给自己点过赞啦，明天再来吧~',
    close: '好的',
    title: '地球 Online',
    subtitle: '你不只是角色，你是被选中的玩家',
    description: '我们都是地球Online里的角色。每一次点赞，都是在和操纵我们的玩家完成一次精神互动——提醒TA多关注自己的处境，期待未来的生活可以更好。',
    footer: '今天，也请对自己好一点。',
  },
  en: {
    todayLikes: "Today's Likes",
    likeButton: 'Like Yourself',
    alreadyLiked: 'Liked Today ✓',
    dialogTitle: 'Liked!',
    dialogMessage: 'You are the #{n} person to like yourself today',
    alreadyLikedMessage: "You've already liked yourself today. Come back tomorrow~",
    close: 'OK',
    title: 'Earth Online',
    subtitle: "You're not just a character — you're the chosen player",
    description: "We are all characters in Earth Online. Every like is a spiritual interaction with the player behind us — a reminder to pay attention to your own journey, and to look forward to a better life ahead.",
    footer: 'Be kind to yourself today.',
  },
}

function getDefaultLocale(): string {
  const lang = navigator.language || 'en'
  return lang.startsWith('zh') ? 'zh' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages,
})

export default i18n
