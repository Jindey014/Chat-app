import { Server } from "socket.io";
import express from 'express'
import http from 'http'

const app = express()

const server = http.createServer(app) //this creates an express server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
}) // here we wrap the express server with the socket server 
//also socket may provide some cors error so we hanle that , origin ma frontend ko url and the two mwthods required for communication



export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}// userid will be the key and socketid will be the value i.e {userId:socketId}


//to listen for connections
io.on("connection", (socket) => {
    console.log("a user is connected", socket.id)
    const userId = socket.handshake.query.userId //socket context bata userid pauna

    if (userId != "undefined") userSocketMap[userId] = socket.id

    //since we updated the usersocketmap we need to send an event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))//io.emit() is used to send events to all connected clients

    //socket.on() is used to listen to events . This can be used in both client and server side
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId];
        //we again send an emit after getting disconnected
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})




export { app, io, server }