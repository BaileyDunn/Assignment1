
var mongo = require("../mongo");
var group = undefined;
var callback = undefined;

module.exports = function(grp, callbk) {
    group = grp;
    callback = callbk;
    mongo.connect(getGroup)
}


async function getGroup(db) {
    callback(await db.collection("groups").findOne({groupName: group}), group);
}