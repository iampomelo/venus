const request = require('request');
const cheerio = require('cheerio');
const save = require('./db/save');

request('http://sports.sina.com.cn/g/premierleague/', (err, res, body)=> {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(body.toString());
        const list = [];
        $('ul.match_news_list').each(function () {
            $(this).children('li').each(function () {
                const a = $(this).children('a');
                const title = a.text().trim();
                const link = a.attr('href');
                if (title) {
                    list.push({
                        title,
                        link
                    });
                }
            });
        });
        (function (i) {
            if (i === list.length) {
                console.log('Finish get data...');
                return;
            }
            const arg = arguments;
            save(list[i]).then(()=> {
                return arg.callee(++i);
            });
        })(0);
    }
});