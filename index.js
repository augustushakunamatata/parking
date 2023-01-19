const fastify = require('fastify')({logger: true}) 
const route  = require('./routes')
const admin =require('./routes')
fastify.register(require('fastify-jwt'), {
    secret: "gdasjgdhjasg"
  })
//const fastifyEnv = require('@fastify/env')
const dbconnector = require('./db')
//var database = require('./db')
fastify.register(dbconnector)
fastify.register(route)


async function start()  { 
    try{ 
        await fastify.listen({ port: 4000 }) 
    } catch(err) { 
        fastify.log.error(err) 
        process.exit(1) 
    } 
} 
//console.log("id:","car:","bike:","id:","date:")



start()
