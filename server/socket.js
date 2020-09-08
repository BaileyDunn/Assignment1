module.exports = {
    connect: function(io, port) {
        //List of socket id's in the that are connected
        var clients = [];

        const chat = io.of('/chat');
        chat.on('connection', (socket) => {
            
            socket.on('sendMessage', (message)=> {
                for(i = 0; i < clients.length; i++) {
                    chat.to(clients[i]).emit('sendMessage', message)
                }  
            });

            socket.on("join", (Room) => {
                socket.join(Room, () => {
                    inRoom = false;
                    for(i=0; i < clients.length; i++) {
                        if(clients[i] == socket.id) {
                            inRoom = true;
                        }
                    }
                    if(inRoom === false) {
                        clients.push(socket.id)
                    }
                    //console.log(clients);
                    //console.log(socket.id);
                })
            })

        })
    }
}