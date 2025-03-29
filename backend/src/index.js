import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import {connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { app, server } from './lib/socket.js';


dotenv.config()

const PORT = process.env.PORT;
const _dirname = path.resolve();

app.use(express.json())
app.use(cookieParser()) // parse cookie for value
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    })
);
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
if(process.env.NODE_ENV === 'production'){
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
    
    app.use(express.static(frontendBuildPath));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
}

server.listen(PORT, () => {
    console.log('server is running on port PORT: ' + PORT)
    connectDB()
})