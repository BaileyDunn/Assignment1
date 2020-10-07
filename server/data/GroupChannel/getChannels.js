var mongo = require("../../data/mongo");
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(getChannels)
}


async function getChannels(db) {
    var allGroups = await db.collection("groups").find({});
    var channels = allGroups.filter(group => group.channels.filter(channel => channel.users.filter(user => user.username = request.body.username).length != 0));
    res.send(
        {
            "result": channels
        }
    );
}