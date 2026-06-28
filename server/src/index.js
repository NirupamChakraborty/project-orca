import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { connectDB } from "./config/db.js";
import { connectToSocket } from "./controllers/socketManeger.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
// const io = new Server(server,{
//     // to solve cors error on socket.io connection, engineering pov
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["*"],
//         credentials: true
//     }
// });

connectToSocket(server);

app.use(express.json());
app.use(cors())

app.use("/api/v1/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const start = () => {
    server.listen(8000, () => {
        console.log("Server started on port 8000");
        connectDB();
    });
};

start();