module.exports = {
    MongoClient: MongoClient = require('mongodb').MongoClient,
    String: url = "mongodb://localhost:27017",
    undefined: db = null,

    connect: function(executeFunction) {
        MongoClient.connect(url, function(err, client) {
            if(err) {return console.log(err)}
            const dbName = 'chatDb';
            db = client.db(dbName);
            console.log("DB connected!")
            executeFunction(db); 
        });  
    }
}

//Used to create tables as needed
async function dbInit() {
    await db.createCollection('groups')
}


