import {io} from "socket.io-client";

const URL = "http://localhost:3001/client";

const connect = io(URL, { autoConnect: false });

connect.connect()

connect.on('stream', ({ status, increment, timePreparing }) => {
    console.log({ status, increment, timePreparing })
})