import fastify from 'fastify'
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import guard from "fastify-guard"
import multipart from "fastify-multipart"
import mongoose from 'mongoose'

import authService from './routes/auth.js'
import productService from './routes/product.js'
import salesService from './routes/sales.js'
const app = fastify()

app.register(jwt, {
    secret: "superkawaii-desu"
})
app.register(cookie, {
    cookieName: 'token',
    signed: false,
})
app.register(guard)
app.register(multipart, { attachFieldsToBody: true })

app.register(authService)
app.register(productService)
app.register(salesService)
const start = async () => {
    try {
        mongoose.connect('mongodb+srv://user:user@cluster0.uc3dx.mongodb.net/backend?retryWrites=true&w=majority')
        await app.listen(3000)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()
