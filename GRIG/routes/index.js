var express = require('express');
var router = express.Router();

var model = require('../models/loginDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', {title: 'GRIG',username: null});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'GRIG', username: null});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
    if(req.body.name && req.body.email && req.body.password){
        model.insertUser(req.body);
        res.render('list', { title: 'GRIG', username: null});
     }else{
        res.render('error');
     }
  });

  router.post('/check', function(req, res, next) {
    model.UserList({query:{email: req.body.email2},
    callback: function(docs){
        if(!docs){
            res.redirect('http://localhost:3000/login');
        }else{
            if(docs.email == req.body.email2 && docs.password == req.body.password2){
                res.render('list', {title: 'GRIG', username: docs.name});
            }else{
                res.redirect('http://localhost:3000/login');
            }
        }
    }

    })
});

module.exports = router;