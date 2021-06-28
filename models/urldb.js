const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlDb = new Schema({
    longUrl: {
        type: String,
    },
    shortUrl: {
        type: String
    },
    click: {
        type: Number
    },
    createdTime: {
        type: String
    }
});

const Url = mongoose.model('urltra', UrlDb);

module.exports = Url;