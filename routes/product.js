import * as fastify from "fastify"
import Products from '../model/products.js'

async function routes(fastify, options) {
    fastify.get('/product', async (request, reply) => {
        await Products.find()
            .then(products => reply.send({ success: true, products }))
    })
    fastify.get('/product/:id', async (request, reply) => {
        const _id = request.params.id 

        await Products.findOne({ _id })
            .then(products => reply.send({ success: true, products }))
    })

    fastify.post('/product/create', async (request, reply) => {
        const { sku, name, description, img } = request.body

        const product = new Products({
            sku, name, description
        })

        await product.save()
            .then(result => reply.send(result))
    })
    fastify.post('/product/list', async (request, reply) => {
        await Product.find()
            .then(products => reply.send({ success: true, products }))
    })
    fastify.post('/product/:id/update', async (request, reply) => {
        const _id = request.params.id
        const { sku, name, description } = request.body

        await Products.updateOne({ _id } , { sku, name, description })
            .then(products => reply.send({ success: true, products}))
    })
    
}


export default routes