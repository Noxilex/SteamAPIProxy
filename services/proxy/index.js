'use strict'

const axios = require("axios")

module.exports = function (fastify, opts, next) {

  const getUserIDopts = {
    schema: {
      queryString: {
        type: 'object',
        properties: {
          vanityurl: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            steamid: { type: 'string' }
          }
        }
      }
    }
  }
  fastify.get('/getUserID', getUserIDopts, function (request, reply) {
    let vanityurl = request.query.vanityurl;
    fastify.log.info(vanityurl)
    if (!vanityurl) {
      reply.status(400).send({ message: 'No vanityurl found' });
    } else {
      getUser(vanityurl).then(response => {
        fastify.log.info(response.data)
        reply.status(200).send({ steamid: response.data.response.steamid })
      }).catch(error => {
        fastify.log.error(error)
        reply.send(error)
      })
    }
  })

  const getFriendAppsOpts = {
    schema: {
      queryString: {
        type: 'object',
        properties: {
          steamid: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            game_count: { type: 'number' },
            games: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  appid: { type: 'number' },
                  playtime_forever: { type: 'number' },
                  playtime_windows_forever: { type: 'number' },
                  playtime_mac_forever: { type: 'number' },
                  playtime_linux_forever: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  }

  fastify.get('/getFriendApps', getFriendAppsOpts, (request, reply) => {
    let steamid = request.query.steamid;
    fastify.log.info(steamid)
    if (!steamid) {
      reply.status(400).send({ message: 'No steamid found' });
    } else {
      getGames(steamid).then(response => {
        reply.send(response.data.response)
      }).catch(err => {
        fastify.log.error(err)
        reply.send(err)
      })
    }
  })

  const getGameInfosOpts = {
    schema: {
      queryString: {
        type: 'object',
        properties: {
          appid: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            game: {
              type: 'object',
              properties: {
                gameName: { type: 'string' },
                gameVersion: { type: 'number' },
                availableGameStats: {
                  type: 'object',
                  properties: {
                    achievements: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          defaultvalue: { type: 'number' },
                          displayName: { type: 'string' },
                          hidden: { type: 'number' },
                          description: { type: 'string' },
                          icon: { type: 'string' },
                          icongray: { type: 'string' }
                        }
                      }
                    },
                    stats: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          defaultvalue: { type: 'number' },
                          displayName: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            },
          }
        }
      }
    }
  }

  fastify.get('/getGameInfos', getGameInfosOpts, (request, reply) => {
    let appid = request.query.appid;
    request.log.info(appid)
    if (!appid) {
      reply.status(400).send({ message: 'No appid found' });
    } else {
      getGameInfos(appid).then(response => {
        reply.send(response.data)
      }).catch(err => {
        fastify.log.error(err)
        reply.send(err)
      })
    }
  })

  const getPlayerNamesOpts = {
    schema: {
      queryString: {
        type: 'object',
        properties: {
          steamids: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            players: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  steamid: { type: 'string' },
                  communityvisibilitystate: { type: 'number' },
                  profilestate: { type: 'number' },
                  personaname: { type: 'string' },
                  profileurl: { type: 'string' },
                  avatar: { type: 'string' },
                  avatarmedium: { type: 'string' },
                  avatarfull: { type: 'string' },
                  lastlogoff: { type: 'number' },
                  personastate: { type: 'number' },
                  primaryclanid: { type: 'string' },
                  timecreated: { type: 'number' },
                  personastateflags: { type: 'number' },
                  loccountrycode: { type: 'string' },
                }
              }
            }
          }
        }
      }
    }
  }

  fastify.get('/getPlayerNames', getPlayerNamesOpts, (request, reply) => {
    let steamids = request.query.steamids;
    request.log.info(steamids)
    if (!steamids) {
      reply.status(400).send({ message: 'No steamids found' });
    } else {
      getPlayerNames(steamids).then(response => {
        reply.send(response.data.response)
      }).catch(err => {
        fastify.log.error(err)
        reply.send(err)
      })
    }
  })

  const getFriendListOpts = {
    schema: {
      queryString: {
        type: 'object',
        properties: {
          steamid: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            friendslist: {
              type: 'object',
              properties: {
                friends: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      steamid: { type: 'string' },
                      relationship: { type: 'string' },
                      friend_since: { type: 'number' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fastify.get('/getFriendList', getFriendListOpts, (request, reply) => {
    let steamid = request.query.steamid;
    request.log.info(steamid)
    if (!steamid) {
      reply.status(400).send({ message: 'No steamid found' });
    } else {
      getFriendList(steamid).then(response => {
        reply.send(response.data)
      }).catch(err => {
        fastify.log.error(err)
        reply.send(err)
      })
    }
  })

  next()
}

function getPlayerNames(steamids) {
  let config = {
    method: 'get',
    url: '/ISteamUser/GetPlayerSummaries/v0002',
    params: {
      key: process.env.API_KEY,
      steamids
    }
  }

  return axios.request(config);
}

function getFriendList(steamid) {
  let config = {
    method: 'get',
    url: '/ISteamUser/GetFriendList/v0001',
    params: {
      key: process.env.API_KEY,
      relationship: 'friend',
      steamid
    }
  }

  return axios.request(config)
}

function getGameInfos(appid) {
  let config = {
    method: 'get',
    url: '/ISteamUserStats/GetSchemaForGame/v2',
    params: {
      key: process.env.API_KEY,
      appid: appid
    }
  }

  return axios.request(config);
}

/**
 * Returns a promise containing steamid of the user provided
 * @param {*} name 
 */
function getUser(username) {
  let config = {
    method: 'get',
    url: '/ISteamUser/ResolveVanityURL/v0001',
    params: {
      key: process.env.API_KEY,
      vanityurl: username
    }
  }
  return axios.request(config)
}

function getGames(steamid) {
  let config = {
    method: 'get',
    url: '/IPlayerService/GetOwnedGames/v0001',
    params: {
      key: process.env.API_KEY,
      steamid: steamid
    }
  }

  return axios.request(config);
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
