var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;
var db = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(addUpdateUser)
}

function login(db) {
    console.log(request.body);
    var success = false;
    var user = await db.collection("users").findOne({username: request.body.username})
    if(user != null) {
        if(user.password === request.body.password) {
            success = true;
        }
        response.send({ "success": success });
    }
}