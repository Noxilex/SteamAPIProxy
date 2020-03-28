'use strict'

const { getUserID, getFriendList, getGameInfos, getGames, getPlayerNames } = require('./steamRequest')
const { getUserIDopts, getFriendListOpts, getGameInfosOpts, getUserAppsOpts, getPlayerNamesOpts } = require('./steamSchema')
const helpers = require('../../helpers')

module.exports = function (fastify, opts, next) {


  fastify.get('/getUserID', getUserIDopts, function (request, reply) {
    let vanityurl = request.query.vanityurl;
    if (!vanityurl) {
      reply.status(400).send({ message: 'No vanityurl found' });
    } else {
      getUserID(vanityurl).then(response => {
        reply.status(200).send({ steamid: response.data.response.steamid })
      }).catch(error => {
        if (error.statusCode == 404) {
          helpers.NotFound(reply, error)
        } else {
          helpers.ErrorResponse(reply, error)
        }
      })
    }
  })

  fastify.get('/getUserApps', getUserAppsOpts, (request, reply) => {
    let steamid = request.query.steamid;
    if (!steamid) {
      reply.status(400).send({ message: 'No steamid found' });
    } else {
      getGames(steamid).then(response => {
        reply.send(response.data.response)
      }).catch(err => {
        helpers.ErrorResponse(reply, err)
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
        helpers.ErrorResponse(reply, err)
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
        helpers.ErrorResponse(reply, err)
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
        helpers.ErrorResponse(reply, err)
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
