module.exports = {
    listen(http, port) {
        let server = http.listen(port, function () {
            let host = server.address().address;
            // let port = this.address().port;
            console.log("Lab Nodejs Server");
            console.log("Listening on: " + host + "port: " + port);
        });
    }  
}