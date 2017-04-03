const Router = require('koa-router');
const router = new Router();
const query = require('./db/query');

router.get('/', async ctx=> {
    const news = await query();
    await ctx.render('index', {news});
});

module.exports = router;