import createError from 'http-errors'
import express from 'express'
import indexRouter from './routes/index'

import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import productsRouter from './routes/products'
import headers from './middlewares/headers'

const app = express()

// view engine setup
app.use(headers)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  const isDev = req.app.get('env') === 'development'

  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: 'error',
    message: err.message,
    errors: err.errors,
    stack: isDev ? err.stack : undefined
  })
})
export default app
