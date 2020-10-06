var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;


module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(addUpdateUser)
}


async function addUpdateUser(db) {
    var user = await db.collection("users").findOne({username: request.body.username})
    console.log(user);
    if(user == null) {
        console.log("Adding new user with username:", request.body.username)
        await db.collection("users").insertOne(request.body);
    }
    else {
        console.log("Updating:", user.username)
        await db.collection("users").updateOne({username: user.username}, { $set: request.body })
    }
    res.send({"result": true})
}