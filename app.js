'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyEnv = require('fastify-env')
const axios = require('axios')

module.exports = function (fastify, opts, next) {

  const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'string',
        default: 3001
      }
    }
  }

  const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true // will read .env in root folder
  }
  // Place here your custom code!
  fastify.register(fastifyEnv, options).ready((err) => {
    if (err) console.error(err)

    console.log(fastify.config)
  })


  // Set base URL for axios

  axios.defaults.baseURL = 'http://api.steampowered.com'


  fastify.register(require('fastify-cors'))

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()
}
