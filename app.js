const express = require("express")
const path = require('path')
const usersRouter =require("./routes/users.js")
const todosRouter =require("./routes/todos.js")
const session = require("express-session")
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const { authGuard } = require("./middlewares/authGuard.js")
dotenv.config(); // require("dotenv").config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION)
.then(()=>{console.log("connected with success to mongodb")

})
.catch(err=>console.log(err))

const app = express()

app.use(express.static("./public"))

app.use('*/js',express.static(path.join(__dirname, 'public/js')));
app.use('*/css',express.static(path.join(__dirname, 'public/css')));
const port = process.env.PORT || 3000

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true
  }
}))


app.use(express.json()) // global
app.use((req,res,next)=>{
    if(!req.session.count)
        req.session.count=1
    else
        req.session.count++
 
    next()
})
app.get("/",(req,res)=>{
    res.send("visited " + req.session.count + " times")
})
app.use("/users",usersRouter);


app.use("/todos",authGuard,todosRouter);



app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})
app.use((req,res)=>{
    res.status(404).json({message:"404 not found"})
})
app.listen(8000,()=>{
    console.log("server started at localhost: " + port)
})