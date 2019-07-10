var express = require('express');
var router = express.Router();
var jd = require('../steamList.json');
var Gmodel = require('../models/gameDAO');

router.get('/', function(req, res, next) {
    jd.forEach(function(k){
        Gmodel.GameList({query:{title: k.title},
        callback: function(docs){
            if(!docs){
                Gmodel.insertGame(k);
            }else{
                console.log("already created");
            }
        }
        })
    })
});

module.exports = router;