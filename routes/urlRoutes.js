const express = require('express');
const { db } = require('../models/urldb');
const UrlRouter = express.Router();
const UrlDb = require('../models/urldb');

let i = 0;
const today = new Date();
const yesterday = new Date(today);

let OneDayBefore = [];

yesterday.setDate(yesterday.getDate()-1);



UrlRouter.post('/', (req, res, next) => {
    let link = req.body.longUrl;
    console.log(req.body.longUrl);
    UrlDb.find({longUrl: req.body.longUrl})
    .then(function(urls) {
        if(urls[0]){
            res.send("Short Url already Present:" + urls[0].shortUrl);
            console.log(urls[0].shortUrl);
            UrlDb.ultras.update({"longUrl":link},{$set:{'click': urls[0].click+1}});
        }
        else{
            console.log(link);
            UrlDb.create({
                ...req.body,
                shortUrl: shorten(link),
                click: 1,
                createdTime: today.toDateString(),
            })
            res.send(shorten(link));
            i = i+1;
        }
    })
    .catch(next);
    
});

function shorten(link){
    let str = link[0] + i + ".com";
    
    console.log(link);
    return str;
}

UrlRouter.post('/short', (req, res, next) => {
    console.log(req.body);
    let slink = req.body.shortUrl;
    UrlDb.find({shortUrl: slink})
    .then(function(urls){
        if(urls[0]){
            res.send(urls[0].longUrl);
        }
        else {
            res.send("No Short Url Found!");
        }
        
    })
    .catch(next);

});

UrlRouter.get('/', (req,res, next) => {
    console.log(today.toDateString());
    UrlDb.find({createdTime: today.toDateString()})
    .then(function(urls){
        console.log(urls.length);
        for(let j=0; j<urls.length; j++){
            OneDayBefore.push(urls[i].longUrl);
        }
        console.log(OneDayBefore);
        res.send(OneDayBefore);
    })
    .catch(err => console.log(err));

})


module.exports = UrlRouter;