function NotFound(reply, error) {
    reply.status(404).send(error)
}

function ErrorResponse(reply, error) {
    console.log(error)
    let code = 500;
    let message = "Unknown error";
    if(error.response){
        code = error.response.status;
        message = error.response.statusText;
    }else {
        code = error.status;
        message = error.message;
    }
    reply.status(code).send({
        statusCode: code,
        message: message
    });
}

module.exports = {
    NotFound,
    ErrorResponse
}