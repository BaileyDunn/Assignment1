var mongo = require("../../data/mongo");

module.exports = function(iCollection, iUsername) {
    var Username = iUsername;
    var Collection = iCollection;
    var result = mongo.connect(getUser)
    return result;
}

async function getUser(dbo) {
    console.log("getting user");
    return await dbo.collection(Collection).findOne({username: Username})
}