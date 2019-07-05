var express = require('express');
var router = express.Router();

var model = require('../models/loginDAO');

router.post('/', function(req, res, next) {
    model.UserList({query:{email: req.body.email},
    callback: function(docs){
        if(!docs){
            res.redirect('http://localhost:3000/login');
        }else{
            if(docs.email == req.body.email && docs.password == req.body.password){
                res.render('list', {title: 'GRIG', username: docs.name});
            }
        }
    }

    })
});
module.exports = router;
