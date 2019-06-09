// module exports a json object
module.exports = {
    // define APIError object
    APIError: function () {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },

    // initialize restify middleware method
    restify: pathPrefix => {
        //handle request path prefix
        pathPrefix = pathPrefix || '/api/';

        // console.log(pathPrefix);

        return async (ctx, next) => {
            let reqPth = ctx.request.path;
            console.log('request path: ' + reqPth);

            if (reqPth.startsWith(pathPrefix)) {
                ctx.rest = data => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                };
                try {
                    // console.log("wait here")
                    await next();
                } catch (e) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || '',
                    };
                }
            } else {
                await next();
            }
        };
    }
};