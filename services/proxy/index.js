'use strict'

const { getUserID, getFriendList, getGameInfos, getGames, getPlayerNames } = require('./steamRequest')
const { getUserIDopts, getFriendListOpts, getGameInfosOpts, getFriendAppsOpts, getPlayerNamesOpts } = require('./steamSchema')
const helpers = require('../../helpers')

module.exports = function (fastify, opts, next) {


  fastify.get('/getUserID', getUserIDopts, function (request, reply) {
    let vanityurl = request.query.vanityurl;
    if (!vanityurl) {
      reply.status(400).send({ message: 'No vanityurl found' });
    } else {
      getUserID(vanityurl).then(response => {
        console.log(response)
        reply.status(200).send({ steamid: response.data.response.steamid })
      }).catch(error => {
        if (error.statusCode == 404) {
          helpers.NotFound(reply, error)
        } else {
          reply.send(error)
        }
      })
    }
  })

  fastify.get('/getUserGames', getFriendAppsOpts, (request, reply) => {
    let steamid = request.query.steamid;
    if (!steamid) {
      reply.status(400).send({ message: 'No steamid found' });
    } else {
      getGames(steamid).then(response => {
        reply.send(response.data.response)
      }).catch(err => {
        reply.send(err)
      })
    }
  })


  fastify.get('/getGameInfos', getGameInfosOpts, (request, reply) => {
    let appid = request.query.appid;
    if (!appid) {
      reply.status(400).send({ message: 'No appid found' });
    } else {
      getGameInfos(appid).then(response => {
        reply.send(response.data)
      }).catch(err => {
        reply.send(err)
      })
    }
  })



  fastify.get('/getPlayerNames', getPlayerNamesOpts, (request, reply) => {
    let steamids = request.query.steamids;
    if (!steamids) {
      reply.status(400).send({ message: 'No steamids found' });
    } else {
      getPlayerNames(steamids).then(response => {
        reply.send(response.data.response)
      }).catch(err => {
        reply.send(err)
      })
    }
  })



  fastify.get('/getFriendList', getFriendListOpts, (request, reply) => {
    let steamid = request.query.steamid;
    if (!steamid) {
      reply.status(400).send({ message: 'No steamid found' });
    } else {
      getFriendList(steamid).then(response => {
        reply.send(response.data)
      }).catch(err => {
        request.log.error(err)
        reply.send(err)
      })
    }
  })

  next()
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
