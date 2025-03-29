import { Server } from "socket.io";
import http from "http";
import express from "express"; 


const app = express();
const server = http.createServer(app);

const io = new Server( server , {
    cors: {
        origin: process.env.NODE_ENV === 'production' 
            ? true  // Allow same origin in production
            : "http://localhost:5173", // Dev origin
        credentials: true
    }
})
export function getReceiverSocketId(userId) { // returnd the socket id of the user
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {

}; //{ userId, socketId}

io.on("connection" , (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id
    // send the list of online users, send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // called the event getOnlineUsers
    socket.on("disconnect" , () =>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})
export {io, app, server};