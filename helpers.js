function NotFound(reply, error) {
    reply.status(404).send(error)
}

module.exports = {
    NotFound
}