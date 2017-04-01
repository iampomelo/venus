const mongoose = require('./db');

const newsSchema = mongoose.Schema({
    title: String,
    link: String
});

const News = mongoose.model('News', newsSchema, 'newslist');

module.exports = news=> {
    const n = new News(news);
    return n.save(err=> {
        if (err) {
            return console.error(err);
        }
    });
};