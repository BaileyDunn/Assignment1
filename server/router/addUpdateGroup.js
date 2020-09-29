const { updateLanguageServiceSourceFile } = require("typescript");
var mongo = require("../data/mongo");
var request = undefined;
var response = undefined;


module.exports = function(req, res) {
    request = req;
    response = res;
    mongo.connect(addUpdateGroup)
}


async function addUpdateGroup(db) {
    var group = await db.collection("groups").findOne({groupName: request.body.groupName})
    console.log(group);
    if(user == null) {
        console.log("Adding new group with Group Name:", request.body.groupName)
        await db.collection("groups").insertOne(request.body);
    }
    else {
        console.log("Updating:", group.groupName)
        await db.collection("groups").updateOne({groupName: group.groupName}, { $set: request.body })
    }
    res.send({"result": true})
}