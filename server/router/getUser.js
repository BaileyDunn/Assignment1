var mongo = require("../data/mongo");
var read = require("../data/crud/read")
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(getUser)
}


async function getUser(dbo) {
    res.send(
        {
            "result": await dbo.collection("users").findOne({username: request.body.username})
        }
    );
}