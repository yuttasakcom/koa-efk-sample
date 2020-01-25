import logger from 'fluent-logger'

const FLUENT_PREFIX = 'fluentd.test'
const ACCESS_LOG = 'accessLog'
const FLUENT_HOST = {
  host: 'localhost',
  port: 24224,
  timeout: 3.0,
  reconnectInterval: 600000, // 10 minutes
}

export default (prefix = FLUENT_PREFIX, host = FLUENT_HOST) => {
  logger.configure(prefix, host)

  return async (ctx, next) => {
    const { req, request, res } = ctx
    let start = new Date()

    const logObject = {
      timestamp: start.getTime(),
      'remote-address': ctx.ip,
      method: req.method,
      host: req.headers.host,
      url: req.url,
      'http-version': req.httpVersion,
      status: res.statusCode,
      'response-time': new Date() - start,
      'request-headers': JSON.stringify(req.headers),
      'request-body': JSON.stringify(request.body),
    }

    logger.emit(ACCESS_LOG, logObject)
    ctx.logger = logger

    next()
  }
}
