var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(getUser)
}


async function getUser(db) {
    res.send(
        {
            "result": await db.collection("users").findOne({username: request.body.username})
        }
    );
}