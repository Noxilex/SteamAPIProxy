function NotFound(reply, error) {
    reply.status(404).send(error)
}

function ErrorResponse(reply, error) {
    reply.status(error.status).send({
        statusCode: error.status,
        message: error.message
    });
}

module.exports = {
    NotFound,
    ErrorResponse
}