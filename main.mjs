
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path: __dirname + '/.env'})

import server from "node:http"
import { Server } from "socket.io";

const httpServer = server.createServer();
const io = new Server(httpServer)

const clientNamespace = io.of("/client");
const adminNamespace = io.of("/admin");

import {Game} from "./game.mjs"

const {  getIncrement, getStatus, timePreparing, start, stop, processing, preparing} = Game();

adminNamespace.use((socket, next) => {
    next();
});

clientNamespace.use((socket, next) => {
    next();
});


clientNamespace.on("connection", async (socket) => {

    socket.emit("stream", {
        status: getStatus(),
        timePreparing,
        increment: getIncrement()
    })
});


adminNamespace.on("connection", async (socket) => {
    console.log(socket.id)
});


(() => {
    function StartGame(){
        return new Promise(async (resolve, reject) => {
            await preparing(({ status, increment, timePreparing }) => {
                console.log("preparing", status)
                clientNamespace.emit("stream", { status, increment, timePreparing })
            })
            await start(({ status, increment, timePreparing }) => {
                console.log("start", status)
                adminNamespace.emit("info", { status, increment, timePreparing })
            })
            await processing(({ status, increment, timePreparing }) => {
                console.log("processing", increment)
                clientNamespace.emit("stream", { status, increment, timePreparing })
            })
            await stop(({ status, increment, timePreparing }) => {
                console.log("stop", status)
                clientNamespace.emit("stream", { status, increment, timePreparing })
            })

            resolve()
        })
    }
    function RoundGame(){
        StartGame().then(() => RoundGame())
    }

    RoundGame()
})();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);