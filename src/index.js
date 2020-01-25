import koa from 'koa'

import fluentLogger from './middleware/fluent-logger'

const app = new koa()
const PORT = process.env.PORT || '3000'

app.use(fluentLogger())

app.use(async ctx => {
  ctx.logger.emit('follow', { message: 'Yo ........' })
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
