require('dotenv').config()

const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const axios = require('axios')
const API_KEY = process.env.API_KEY

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

const genres = {
  comedy: 35,
  horror: 27,
  scifi: 878,
  drama: 18,
}

bot.start((ctx) => {
  ctx.reply(
    '🎬 Привет! Я помогу тебе выбрать фильм!',
    Markup.keyboard([
      ['🎲 Случайный фильм'],
      ['🎭 По жанру', '🔥 Популярное'],
    ]).resize(),
  )
})

bot.hears('🎲 Случайный фильм', async (ctx) => {
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1

    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${randomPage}`,
    )

    const movies = res.data.results
    const movie = movies[Math.floor(Math.random() * movies.length)]

    const title = movie.title
    const rating = movie.vote_average
    const overview = movie.overview
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    await ctx.replyWithPhoto(poster, {
      caption: `🎬 ${title}\n⭐ ${rating}\n\n${overview}`,
    })
  } catch (err) {
    console.error(err)
    ctx.reply('Ошибка при получении фильма 😢')
  }
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

async function sendByGenre(ctx, genreId) {
  try {
    const randomPage = Math.floor(Math.random() * 10) + 1

    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${randomPage}`,
    )

    const movies = res.data.results

    if (!movies.length) {
      return ctx.reply('Не удалось найти фильмы 😢')
    }

    const movie = movies[Math.floor(Math.random() * movies.length)]

    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    await ctx.replyWithPhoto(poster, {
      caption:
        `🎬 ${movie.title}\n` +
        `⭐ ${movie.vote_average}\n\n` +
        `${movie.overview}`,
    })
  } catch (err) {
    console.error(err)
    ctx.reply('Ошибка при загрузке фильма 😢')
  }
}

bot.hears('🔥 Популярное', (ctx) => {
  ctx.reply('Скоро покажу популярные фильмы 🔥')
})

bot.launch()

console.log('Бот работает!')
