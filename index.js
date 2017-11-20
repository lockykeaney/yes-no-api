const koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const router = require('koa-simple-router')
const error = require('koa-json-error')
const logger = require('koa-logger')
const koaRes = require('koa-res')
const cors = require('koa-cors')
// const handleError = require('koa-handle-error')

const app = new koa()

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/gobstopper')
    .then((response) => {
        console.log('connected to mongoose')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(async(ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
})
app.use(logger())
app.use(bodyParser())
app.use(convert(koaRes()))
app.use(cors())

const controller = require('./Controller')

app.use(router(_ => {
    _.get('/', async(ctx) => {
        ctx.body = { message: "success" }
    })
    _.get('/all', controller.getQuestions)
    _.post('/new', controller.newQuestion)
}))

app.listen(5432)