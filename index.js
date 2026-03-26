const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf('8787457881:AAGeAQgnbpwsxBOAYVa3GkIBF_MPr1QEgRk')

const movies = ['Inception', 'Interstellar', 'The Matrix', 'Fight Club']

bot.start((ctx) => {
  ctx.reply(
    '🎬 Привет! Я помогу тебе выбрать фильм!',
    Markup.keyboard([
      ['🎲 Случайный фильм'],
      ['🎭 По жанру', '🔥 Популярное'],
    ]).resize(),
  )
})

bot.hears('🎲 Случайный фильм', (ctx) => {
  const random = movies[Math.floor(Math.random() * movies.length)]
  ctx.reply(`🎥 Посмотри: ${random}`)
})

bot.hears('🎭 По жанру', (ctx) => {
  ctx.reply('Скоро можно будет выбирать жанры 🎭')
})

bot.hears('🔥 Популярное', (ctx) => {
  ctx.reply('Скоро покажу популярные фильмы 🔥')
})

bot.launch()

console.log('Бот работает!')
