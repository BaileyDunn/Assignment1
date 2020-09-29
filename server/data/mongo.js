module.exports = {
    MongoClient: MongoClient = require('mongodb').MongoClient,
    String: url = "mongodb://localhost:27017",
    undefined: db = null,

    connect: async function(executeFunction) {
        await MongoClient.connect(url, async function(err, client) {
            if(err) {return console.log(err)}
            const dbName = 'chatDb';
            db = client.db(dbName);
            console.log("DB connected!")
            var result = await executeFunction(db); 
            return result;  
        });  
    }
}

    
async function dbInit() {
    var collections = db.collectionNames('users', function(err, f) {
        console.log(f)
    })
    console.log(collections)
    console.log(collections.includes("users"))
    if(!collections.includes("users")) {
        await db.createCollection('users')
    }
    else {
        console.log("working");
    }
}


