const db = require('./db');

module.exports = ()=> {
    return new Promise((resolve, reject)=> {
        db.News.find({}, 'title link', (err, news)=> {
            if (err) {
                return reject(err);
            }
            resolve(news);
        });
    });
};