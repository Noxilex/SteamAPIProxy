const axios = require('axios')
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
function getUserID(username) {
    let config = {
        method: 'get',
        url: '/ISteamUser/ResolveVanityURL/v0001',
        params: {
            key: process.env.API_KEY,
            vanityurl: username
        }
    }
    return axios.request(config).then(response => {
        let data = response.data;
        if (data.response.success == 42) {
            throw ({
                statusCode: 404,
                error: "Not found",
                message: "No user found with this steamid"
            })
        } else {
            return response
        }
    })
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


module.exports = {
    getPlayerNames,
    getGames,
    getGameInfos,
    getUserID,
    getFriendList
}