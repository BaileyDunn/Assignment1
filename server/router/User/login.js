var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;
var db = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(login)
}

async function login(db) {
    var result = null;
    var user = await db.collection("users").findOne({username: request.body.username})
    if(user != null) {
        if(user.password === request.body.password) {
            result = user;
        }   
    }
    response.send({ "result": result });
}

async function templogin(db) {
    await db.collection("users").remove({});
    await db.collection("users").insertOne({username: "Super.User", password: "P4ssw0rd", superUser: true, email: "test@test.com"});
    console.log(request.body);
    var result = null;
    var user = await db.collection("users").findOne({username: request.body.username})
    if(user != null) {
        if(user.password === request.body.password) {
            result = user;
        }
        
    }
    response.send({ "result": result });
}