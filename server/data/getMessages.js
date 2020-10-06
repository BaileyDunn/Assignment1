//This needs to be converted to a socket interaction
var mongo = require("./mongo");
var request = undefined;
var response = undefined;

module.exports = function(req, res) {
    request = req;
    response = res;a
    mongo.connect(getMessages)
}


async function getMessages(db) {
    res.send(
        {
            "result": await db.collection("messages").find({
                channel: request.body.channel
            })
        }
    );
}