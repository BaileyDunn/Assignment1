//This needs to be converted to a socket interaction
var mongo = require("./mongo");
var message = undefined;
var callback = undefined;


module.exports = function(msg, callbk) {
    message = msg;
    callback = callbk;
    mongo.connect(sendMessage)
}


async function sendMessage(db) {
    await db.collection("messages").insertOne(request.body);
    callback(await db.collection("messages").find({channel: message.channel, group: message.group}));
}