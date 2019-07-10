const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'Games'; // Database Name

var db;

MongoClient.connect(url,{useNewUrlParser: true}, function(err,client){
    db = client.db(dbName);
    db.Gamedata = db.collection('Gamedata');
});

// 게임 데이터 제공
exports.GameList = function(obj){
    db.Gamedata.findOne(obj.query, function(err,docs){
        if(err){
            console.log(err.message)
        }else{
            obj.callback(docs);
        }
    });
}

exports.GameStarDown = function(obj)
    {db.Gamedata.updateOne({"title":obj.title},
    {$pull:{SP: obj.insp, Participants: obj.name}},
    function(err,doc3){
        if(err){
            console.log(err.message);
        }else{
            obj.callback(doc3);
        }
    }
    )
}

exports.GameStarUp = function(obj){
    db.Gamedata.updateOne({"title":obj.title},
        {$push:{SP: obj.insp, Participants: obj.name}},
        function(err,doc2){
            if(err){
                console.log(err.message);
            }else{
                obj.callback(doc2);
            }
        }
    )
}

// 유저 항목 추가
exports.insertGame = function(insertData){
    db.Gamedata.insertOne({
        title:insertData.title,
        SP: [10],
        Participants: ["admin"]
        },
        function(err, result){
            if(err){
                console.log(err.message)
            }else{
                console.log('data inserted')
            }
        })
}