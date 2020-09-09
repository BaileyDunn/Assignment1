module.exports = {
    connect: function(io, port) {
        //List of socket id's in the that are connected and the room they are connected to
        var groups = [];
        var channels = [];
        var clientChannels = [];


        const chat = io.of("/chat");
        chat.on("connection", (socket) => {
            
            socket.on("message", (message)=> {
                for(let i = 0; i < clientChannels.length; i++) {
                    //Find the senders current channel and emit a message to all users inside
                    if(clientChannels[i][0] == socket.id) {
                        chat.to(clientChannels[i][1]).emit("sendMessage", message)
                    }
                }  
            });

            socket.on("createChannel", (channelName)=> {
                //If Channel doesnt already exist
                if(channels.indexOf(channelName) == -1) {
                    channels.push(channelName);
                    chat.emit("getChannelList", JSON.stringify(channels));
                }
            });

            socket.on("createGroup", (groupName)=> {
                //If Group doesnt already exist
                if(groups.indexOf(groupName) == -1) {
                    groups.push(groupName);
                    chat.emit("getGroupList", JSON.stringify(groups));
                }
            });

            socket.on("removeChannel", (channelName)=> {
                channels.splice(channels.indexOf(channelName) -1,1);
                chat.emit("getChannelList", JSON.stringify(channels));
            })

            socket.on("removeGroup", (groupName)=> {
                groups.splice(groups.indexOf(groupName) -1,1);
                chat.emit("getGroupList", JSON.stringify(groups));
            })

            socket.on("reqChannelList", (m)=> {
                chat.emit("getChannelList", JSON.stringify(channels));
            });

            socket.on("reqGroupList", (m)=> {
                chat.emit("getGroupList", JSON.stringify(groups));
            });

            socket.on("join", (channel) => {
                if(channels.includes(channel)) {
                    socket.join(channel, () => {
                        inChannel = false;
                        for(let i = 0; i < clients.length; i++) {
                            if(clients[i][0] == socket.id) {
                                clientChannels[i][1] = channel;
                                inChannel = true;
                            }
                        }
                        if(inChannel === false) {
                            clients.push([socket.id, channel]);
                        }
                    });
                    return chat.in(channel).emit("joinedChannel", channel);
                }
            });

            socket.on("leaveChannel", (channel)=> {
                for(let i = 0; i < clientChannels.length; i++) {
                    if(clientChannels[i][0] == socket.id) {
                        clientChannels.splice(i,1);
                        socket.leave(channel);
                    }
                }    
            });

            socket.on("disconnect", ()=> {
                for(let i = 0; i < clientChannels.length; i++) {
                    if(clientChannels[i][0] == socket.id) {
                        clientChannels.splice(i,1);
                    }
                }    
            })

        })
    }
}