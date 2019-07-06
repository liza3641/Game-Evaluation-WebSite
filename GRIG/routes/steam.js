const axios = require('axios');
const cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://store.steampowered.com/search/?filter=topsellers&tags=492&category1=998')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html); 
            let steamList = [];
            $('.search_result_row').each(function(i, elem) {
                steamList[i] = {
                    title: $(this).find('div.responsive_search_name_combined div.ellipsis span.title').text(),
                    url: $(this).attr('href'),
                    image: $(this).find('div.search_capsule img').attr('src')
                }      
            });
            const steamListTrimmed = steamList.filter(n => n != undefined )
            fs.writeFile('steamList.json', 
                          JSON.stringify(steamListTrimmed, null, 4), 
                          (err)=> console.log('File successfully written!'))
    }
}, (error) => console.log(err) ); 