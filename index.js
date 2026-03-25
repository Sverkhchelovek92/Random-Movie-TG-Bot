const { Telegraf } = require('telegraf')

const bot = new Telegraf('8787457881:AAGeAQgnbpwsxBOAYVa3GkIBF_MPr1QEgRk')

bot.start((ctx) => {
  ctx.reply('🎬 Привет! Я помогу тебе выбрать случайный фильм!')
})
