import koa from 'koa'
import bodyParser from 'koa-bodyparser'

import fluentLogger from './middleware/fluent-logger'

const app = new koa()
const PORT = process.env.PORT || '3000'

app.use(bodyParser())
app.use(fluentLogger())

app.use(async ctx => {
  ctx.logger.emit('appLog', { datas: JSON.stringify({ msg: 'Yo :)' }) })
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
