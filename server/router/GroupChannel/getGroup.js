var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(getGroup)
}


async function getGroup(db) {
    res.send(
        {
            "result": await db.collection("groups").findOne({groupName: request.body.groupName})
        }
    );
}