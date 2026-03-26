const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf('8787457881:AAGeAQgnbpwsxBOAYVa3GkIBF_MPr1QEgRk')

const movies = [
  { title: '2001: A Space Odyssey', genre: 'sci-fi' },
  { title: 'Blade Runner', genre: 'sci-fi' },
  { title: 'The Terminator', genre: 'sci-fi' },
  { title: 'Anora', genre: 'drama' },
  { title: 'There Will Be Blood', genre: 'drama' },
  { title: 'Love Exposure', genre: 'drama' },
  { title: 'Greener Grass', genre: 'comedy' },
  { title: 'Monty Python and the Holy Grail', genre: 'comedy' },
  { title: 'It Follows', genre: 'horror' },
  { title: 'Prince of Darkness', genre: 'horror' },
  { title: 'The Fly', genre: 'horror' },
]

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
  ctx.reply(
    'Выбери жанр:',
    Markup.keyboard([
      ['😂 Комедия', '😱 Ужасы'],
      ['🚀 Sci-Fi', '🎭 Драма'],
      ['⬅️ Назад'],
    ]).resize(),
  )
})

bot.hears('😂 Комедия', (ctx) => sendByGenre(ctx, 'comedy'))
bot.hears('😱 Ужасы', (ctx) => sendByGenre(ctx, 'horror'))
bot.hears('🚀 Sci-Fi', (ctx) => sendByGenre(ctx, 'sci-fi'))
bot.hears('🎭 Драма', (ctx) => sendByGenre(ctx, 'drama'))

bot.hears('⬅️ Назад', (ctx) => {
  ctx.reply(
    '🎬 Главное меню:',
    Markup.keyboard([['🎲 Случайный фильм'], ['🎭 По жанру']]).resize(),
  )
})

function sendByGenre(ctx, genre) {
  const filtered = movies.filter((m) => m.genre === genre)

  if (filtered.length === 0) {
    return ctx.reply('Нет фильмов 😢')
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)]
  ctx.reply(`🎥 Попробуй: ${random.title}`)
}

bot.hears('🔥 Популярное', (ctx) => {
  ctx.reply('Скоро покажу популярные фильмы 🔥')
})

bot.launch()

console.log('Бот работает!')
