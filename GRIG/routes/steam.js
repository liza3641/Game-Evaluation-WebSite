var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
let fs = require('fs');
var jd = require('../steamList.json');
router.get('/steam', function(req, res, next) {
    axios.get('https://store.steampowered.com/search/?filter=topsellers&tags=492&category1=998')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html); 
            let steamList = [];
            $('.search_result_row').each(function(i, elem) {                
                let Myurl = url.parse($(this).attr('href'));
                let myurlarray=Myurl.pathname.split('/');
                steamList[i] = {
                    title: $(this).find('div.responsive_search_name_combined div.ellipsis span.title').text(),
                    url: Myurl.href,
                    image: "https://steamcdn-a.akamaihd.net/steam/apps/"+myurlarray[2]+"/header.jpg",
                    price: $(this).find('div.search_price').text(),
                    id: i
                }      
            });
            const steamListTrimmed = steamList.filter(n => n != undefined )
            fs.writeFile('steamList.json', 
                          JSON.stringify(steamListTrimmed, null, 4), 
                          (err)=> console.log('File successfully written!'))
    }
}, (error) => console.log(err) )
res.redirect('/');
});

module.exports = router;
