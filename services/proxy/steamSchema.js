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
const getUserAppsOpts = {
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
                                name: { type: 'string' },
                                img_icon_url: { type: 'string' },
                                img_logo_url: { type: 'string' },
                                has_community_visible_stats: { type: 'boolean' },
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

module.exports = {
    getFriendListOpts,
    getUserIDopts,
    getUserAppsOpts,
    getGameInfosOpts,
    getPlayerNamesOpts
}