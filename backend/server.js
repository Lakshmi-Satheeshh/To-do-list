const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();
connectDB();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users",userRoutes);
app.use("/api/todos",todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
    
})