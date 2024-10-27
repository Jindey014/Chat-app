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


//to listen for connections
io.on("connection", (socket) => {
    console.log("a user is connected", socket.id)

    //socket.on() is used to listen to events . This can be used in both client and server side
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})




export { app, io, server }