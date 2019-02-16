function route(requestType, path, parameters, handle, response) {
    if (requestType === 'GET') {
        if (handle[path]) {
            handle[path](response, parameters);
        } else {
            response.write("NO THIS DOESN'T WORK TURN THE FOK AROUND");
            response.end();
        }
    } else {
        response.write("DON'T POST WE ONLY GET");
        response.end();
    }
}

exports.route = route;