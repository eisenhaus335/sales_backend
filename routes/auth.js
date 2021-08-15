import * as fastify from "fastify"
import fp from "fastify-plugin"
import bcrypt from "bcrypt"
import users from '../model/users.js'

/** 
 * 
 * @param {fastify.FastifyInstance} fastify
 * @param {*} options
 */
async function routes(fastify, options) {
    
    fastify.post('/auth/login', async (request, reply) => {
        const { username, password } = request.body

        let user = await users.findOne({ username })
        let result = await bcrypt.compare(password, user.password)

        if (!result) {
            reply.code(401)
            throw new Error("Authentication is Failed")
        }
        
        return { success: true, token: fastify.jwt.sign({ username, roles: user.roles }), username, roles: user.roles }
    })
    
    fastify.post('/auth/register', async (request, reply) => {
        const { username, password } = request.body
        
        let hash_password = await bcrypt.hash(password, 10)
        let doc = { username, password: hash_password }

        const result = await users.insertOne(doc)

        reply.statusCode = 201
        return {
            success: true,
            username,
        }
    })
}

export default routes