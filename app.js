const Koa = require('koa');
const koaStatic = require('koa-static');
const router = require('./router');
const restRouter = require('./controller/api');
const bodyParser = require('koa-bodyparser');
const restify = require('./rest').restify;
const path = require('path');
// const koaView = require('koa-views')
const https = require('https');
const enforceHttps = require('koa-sslify');
const fd = require('fs');

const app = new Koa();

// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/stonelyu.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/stonelyu.com/fullchain.pem')
// }

app
// .use(enforceHttps())
    .use(koaStatic(path.join(__dirname, 'public')))
    // .use(koaView(path.join(__dirname, 'view'), {extension: 'ejs'}))
    .use(bodyParser())
    .use(restify())
    .use(router.routes())
    .use(restRouter.routes())
    .use(router.allowedMethods());

app.listen(5000, () => {
    console.log('https server is running on 5000');
});

// https.createServer(options, app.callback).listen(30000, () => {
//     console.log('https server is running on 30000');
// })
//

