const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'LoginUsers'; // Database Name

var db;

MongoClient.connect(url,{useNewUrlParser: true}, function(err,client){
    db = client.db(dbName);
    db.Userdata = db.collection('Userdata');
});

// 유저 데이터 제공
exports.UserList = function(obj){
    db.Userdata.findOne(obj.query, function(err,docs){
        if(err){
            console.log(err.message)
        }else{
            obj.callback(docs);
        }
    });
}


// 유저 항목 추가
exports.insertUser = function(insertData){
    db.Userdata.insertOne({name: insertData.name, email: insertData.email, password: insertData.password},
        function(err, result){
            if(err){
                console.log(err.message)
            }else{
                console.log('data inserted')
            }
        })
}