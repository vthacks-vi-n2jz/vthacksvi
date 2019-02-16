function route(requestType, path, parameters, handle, response) {
    if (requestType === 'GET') {
        if (handle[path]) {
            handle[path](response, parameters);
        } else {
            response.write("Fail.");
            response.end();
        }
    } else {
        response.write("Fail.");
        response.end();
    }
}

exports.route = route;