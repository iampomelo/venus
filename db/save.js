const db = require('./db');

module.exports = news=> {
    const n = new db.News(news);
    return n.save(err=> {
        if (err) {
            return console.error(err);
        }
    });
};