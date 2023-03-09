const mongoose = require("mongoose")
const TodoSchema = require("./todos")
const Schema= mongoose.Schema

const UserSchema= new Schema({
    login:{type:String,required:true,unique:true},
    pwd:{type:String,required:true},
    todos:[
        TodoSchema
    ]
})
const User = mongoose.model("User",UserSchema)
module.exports = User
