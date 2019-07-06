var express = require('express');
var router = express.Router();
var session = require('express-session');
var jd = require('../steamList.json');

var model = require('../models/loginDAO');

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: 'mongodb://localhost/LoginUsers',
  collection: "sessions"
 })
}));

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.name){
        req.session.name = '로그인';
      }
  res.render('list', {title: 'GRIG',username: req.session.name, jdata: jd});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'GRIG', username: req.session.name});
});


/* POST login page. */
router.post('/login', function(req, res, next) {
    if(req.body.name && req.body.email && req.body.password){
        model.UserList({query:{email: req.body.email},
        callback: function(docs){
            if(!docs){
                model.insertUser(req.body);
                res.render('login', { title: 'GRIG', username: req.session.name});
            }else{
                res.render('regierr', { title: 'GRIG', username: req.session.name});
            }
        }
        })
     }else{
        res.render('error');
     }
  });

  router.post('/check', function(req, res, next) {
    model.UserList({query:{email: req.body.email2},
    callback: function(docs){
        if(!docs){
            res.render('logerr', { title: 'GRIG', username: null, logerr: 0});
        }else{
            if(docs.email == req.body.email2 && docs.password == req.body.password2){
                req.session.name = docs.name;
                res.render('list', {title: 'GRIG', username: req.session.name});
            }else{
                res.render('logerr', { title: 'GRIG', username: req.session.name, logerr: 1});
            }
        }
    }

    })
});

router.get('/logout', (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
})

module.exports = router;