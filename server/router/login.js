var fs = require('fs');

module.exports = function(req, res) {
    console.log(req.body);
    // fs.readFile('data/users.json', 'utf8', function(err, data) {
    //     if(err) throw err;
    //     let users = JSON.parse(data);
    //     console.log("Users are as below:")
    //     console.log(users);
    //     let index = users.findIndex(user => ((user.username == req.body.username) && (user.password == req.body.password)));
    //     console.log(index);

    
    //     if(index != -1) {
    //         req.body.valid = true;
    //     }
    //     res.send({"result": req.body});
    // });

    //Used this to origionally setup the Json file
    // console.log("Test");
    // var user1 = new Name("Test", "User");
    // var user2 = new Name("Bailey", "1");
    // let users = new Array(0);
    // users.push(user1);
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
    constructor(Name, Password) { 
        this.username = Name;
        this.password = Password;
        this.email = "test@test.com";
     }
  }