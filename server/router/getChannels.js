var mongo = require("../data/mongo");
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(getChannels)
}


async function getChannels(db) {
    res.send(
        {
            "result": await db.collection("groups").findOne({username: request.body.username})
        }
    );
}