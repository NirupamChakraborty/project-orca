import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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