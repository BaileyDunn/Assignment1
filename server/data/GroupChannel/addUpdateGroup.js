const { updateLanguageServiceSourceFile } = require("typescript");
var mongo = require("../../data/mongo");
var group = undefined;
var callback = undefined;

module.exports = function(grp, callbk) {
    group = grp;
    callback = callbk;
    mongo.connect(addUpdateGroup)
}


async function addUpdateGroup(db) {
    console.log(group);
    var existingGroup = await db.collection("groups").findOne({groupName: group.groupName})
    if(existingGroup == null) {
        console.log("Adding new group with Group Name:", group.groupName)
        await db.collection("groups").insertOne(group);
    }
    else {
        console.log("Updating:", group.groupName)
        await db.collection("groups").updateOne({groupName: group.groupName}, { $set: group })
    }
    callback(await db.collection("groups").find({}))
}