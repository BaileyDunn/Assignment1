var fs = require('fs');

module.exports = function(req, res) {
    console.log(req.body);
    fs.readFile('data/users.json', 'utf8', function(err, data) {
        if(err) throw err;
        let users = JSON.parse(data);
        //console.log("Users are as below:")
        //console.log(users);
        let user = users.find(user => ((user.username == req.body.username) && (user.password == req.body.password)));
        // console.log(index);
        if(user === undefined) {
            req.body = null
        } else {
            req.body = user;
        }

    
        // if(index != -1) {
        //     req.body.valid = true;
        // }
        res.send({"result": req.body});
    });

    //Used this to origionally setup the Json file
    //console.log("Test");
    // var user2 = new Account("Bailey", "1", "bailey@test.com.au", true);
    // let users = new Array(0);
    // // users.push(user1);
    // users.push(user2);
    // console.log(users);
    // json = JSON.stringify(users);
    // console.log(users);
    // fs.writeFile('data/users.json', json, 'utf8', function(err, data) {
    //     if(err) throw err;
    //     res.send({ "user": user})
    // })
}

class Account {
    username;
    password;
    email;
    superUser
    constructor(Name, Password, Email, SuperUser) { 
        this.username = Name;
        this.password = Password;
        this.email = Email;
        this.superUser = SuperUser
     }
}