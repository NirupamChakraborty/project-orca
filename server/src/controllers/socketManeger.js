import { Server } from "socket.io";


let connections = {};
let messages={};
let timeOnline = {};
// path are the how many servers are there

export const connectToSocket = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        // console.log("a user connected");
        // join call
        socket.on("join-call", (path)=>{
            if(connections[path] === undefined){
                connections[path]=[]  
            }
            connections[path].push(socket.id)
            timeOnline[socket.id]= new Date()

            for(let i= 0; i<connections[path].length; i++){
                io.to(connections[path][i]).emit("user-joined", socket.id)
            }

            if(messages[path] !== undefined){
                for(let i= 0; i<messages[path].length; i++){
                    io.to(socket.id).emit("chat-message", messages[path][i]['socket-id-sender'])
                }
            }
    


        })

        // signal
        socket.on("signal", (toId, message)=>{
            socket.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data,message)=>{
            const [matchingRoom, found] = Object.entries(connections)
            .reduce(([room, isFound],[roomKey, romValue]) =>{
                if(!isFound && romValue.includes(data)){
                    return [roomKey, true]
                }
                return [room, isFound]
            },['', false])


            if(found===true){
                if(messages[matchingRoom] === undefined){
                    messages[matchingRoom]=[]
                }
                messages[matchingRoom].push({
                    'message': message,
                    'socket-id-sender': socket.id,
                    'data': data
                })
                // console.log("messages", messages)
                for(let i= 0; i<connections[matchingRoom].length; i++){
                    io.to(connections[matchingRoom][i]).emit("chat-message", message)
                }
            }
        })

        // disconnect
        socket.on("disconnect", () => {
            // console.log("a user disconnected");
        })
    })
    return io;
    
}