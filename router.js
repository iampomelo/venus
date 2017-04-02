const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx=> {
    await ctx.render('index', {'h2': 'hehehe'});
});

module.exports = router;