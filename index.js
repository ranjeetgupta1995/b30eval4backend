const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
const { postRouter } = require("./routes/post.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page!!")
})

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("Server is connected to DB")
        console.log(`Server is running at port ${process.env.port}`)
    } catch(err){
        console.log(err)
    }
})