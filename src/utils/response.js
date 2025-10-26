const Response = require('@aws-lambda/http').Response;

export default {
    success: (body) => {
        return new Response()
            .status(200)
            .body(JSON.stringify(body))
            .header('Content-Type', 'application/json')
            .json();
    },
    paginatedSuccess: (body, totalCount) => {
        return new Response()
            .status(200)
            .body(JSON.stringify(body))
            .header('Total-Count', totalCount)
            .header('Content-Type', 'application/json')
            .json();
    },
    created: (body) => {
        return new Response()
            .status(201)
            .body(JSON.stringify(body))
            .header('Content-Type', 'application/json')
            .json();
    },
    noContent: () => {
        return new Response()
            .status(204)
            .header('Content-Type', 'application/json')
            .json();
    },
    serverError: (error) => {
        console.log(error);
        return new Response()
            .status(500)
            .body(
                JSON.stringify({
                    error: error.code,
                    message: error.message,
                    time: error.time
                })
            )
            .header('Content-Type', 'application/json')
            .json();
    },
    notFoundError: (message) => {
        return new Response()
            .status(404)
            .body(
                JSON.stringify({
                    error: 'NotFoundError',
                    message: message,
                    time: new Date().toISOString()
                })
            )
            .header('Content-Type', 'application/json')
            .json();
    },
    validationError: (message) => {
        return new Response()
            .status(400)
            .body(
                JSON.stringify({
                    error: 'ValidationError',
                    message: message,
                    time: new Date().toISOString()
                })
            )
            .header('Content-Type', 'application/json')
            .json();
    },
    forbiddenError: (message) => {
        return new Response()
            .status(403)
            .body(
                JSON.stringify({
                    error: 'ForbiddenError',
                    message: message,
                    time: new Date().toISOString()
                })
            )
            .header('Content-Type', 'application/json')
            .json();
    },
    methodNotAllowedError: (message) => {
        return new Response()
            .status(405)
            .body(
                JSON.stringify({
                    error: 'MethodNotAllowedError',
                    message: message,
                    time: new Date().toISOString()
                })
            )
            .header('Content-Type', 'application/json')
            .json();
    }
};
