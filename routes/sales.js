import Sales from '../model/sales.js'

async function routes(fastify, options) {
    fastify.get('/sales/list', async (request, reply) => {
        await Sales.find({}, { items: 0 })
            .then(sales => reply.send({ success: true, sales }))
    })
    fastify.get('/sales/:id', async (request, reply) => {
        const _id = request.params.id
        await Sales.findOne({ _id })
            .then(sales => reply.send({ success: true, sales }))
    })
    fastify.post('/sales/create', async (request, reply) => {
        const { full_name, address, items, total_value } = request.body
        const sales = new Sales({
            full_name, address, items, total_value
        })

        await sales.save()
            .then(sales => reply.send(sales))
    })

    
}

export default routes 