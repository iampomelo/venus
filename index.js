const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const onerror = require('koa-onerror');
const config = require('./config');
const router = require('./router');
const spider = require('./spider');

onerror(app);

app.use(views(__dirname + '/views', {
    extension: 'hbs',
    map: {
        hbs: 'handlebars'
    }
}));
app.use(router.routes());
app.use(router.allowedMethods());

spider.run().then(()=> {
    app.listen(config.PORT);
    console.log('listening on port ' + config.PORT);
});