const request = require('request');
const cheerio = require('cheerio');
const save = require('./db/save');
const SPIDER_URL = require('./config').SPIDER_URL;

module.exports = {
    run() {
        return new Promise((resolve, reject)=> {
            request(SPIDER_URL, (err, res, body)=> {
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
                            console.log('Finish Get Data...');
                            return resolve();
                        }
                        const arg = arguments;
                        save(list[i]).then(()=> {
                            return arg.callee(++i);
                        });
                    })(0);
                }
            });
        });
    }
};