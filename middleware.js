const jwt = require('jsonwebtoken');
const token_secret = "my-token-secret";

exports.verify = (request, response, next) => {
    const token = request.headers.authorization;

    if(!token) {
        response.status(403).json({error: "Token not provided"});
    } else {
        jwt.verify(token.split(" ")[1], token_secret, (err, val) => {
            if(err) {
                response.status(500).json({error: "Failed to authenticate"});
            } else {
                request.user = val.data; 
                next();
            }
        });
    }
};

exports.enableCrossOrigin = (request, response, next) => {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}