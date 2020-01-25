import logger from 'fluent-logger'

const FLUENT_PREFIX = 'fluentd.test'
const FLUENT_HOST = {
  host: 'localhost',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000, // 10 minutes
}

export default (prefix = FLUENT_PREFIX, host = FLUENT_HOST) => {
  logger.configure(prefix, host)

  return async (ctx, next) => {
    ctx.logger = logger
    next()
  }
}
