const { Telegraf } = require('telegraf')

const bot = new Telegraf('8787457881:AAGeAQgnbpwsxBOAYVa3GkIBF_MPr1QEgRk')

bot.start((ctx) => {
  ctx.reply(
    '🎬 Привет! Я помогу тебе выбрать случайный фильм! \nНапиши /random',
  )
})

bot.command('random', (ctx) => {
  const movies = ['Mulholland Dr.', 'Parasite', 'Oppenheimer', 'Fight Club']

  const random = movies[Math.floor(Math.random() * movies.length)]
  ctx.reply(`Попробуй посмотреть: ${random}`)
})

bot.launch()

console.log('Бот работает!')
