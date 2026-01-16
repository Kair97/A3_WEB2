const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = 3000;

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html")
})

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use("/api", blogRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected successfully");
}).catch((error)=>{
    console.error("MongoDB connection error:", error);
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
