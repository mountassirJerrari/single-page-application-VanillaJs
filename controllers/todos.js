const User = require("../ models/users");

module.exports.getAll = async (req,res)=>{

    let user = await User.findById(req.session.userId) 
    let limit=req.query.limit  || user.todos.length
    let todos = user.todos.filter((element,index)=>index<limit)
    res.json(todos)
}

module.exports.getTodo= async (req,res)=>{
    let id = req.params.id
  
    let user = await User.findById(req.session.userId) 
    
    let todo=user.todos.find(element=>element.id==id)
    if(todo)
        res.json(todo)
    else
        res.status(404).json({message:"todo with id = " + id + " not found"})
}

module.exports.insertTodo = async (req,res)=>{
    let {title, completed }=req.body
    //verification
    if(!title || completed==undefined)
        return res.status(400).json({message:"userId, title and completed are required"})
    let data = {title,completed}
    let user = await User.findById(req.session.userId) 
    user.todos.push(data)
    user.save().then(()=>res.json(user))
    .catch(err=>{
        res.status(500).json({message:"please try again later"})
        })
    }

module.exports.deleteTodo = async (req,res)=>{
    let id = req.params.id
    let user = await User.findById(req.session.userId) 

    let todo=user.todos.find(element=>element.id==id)
    if(!todo)
        return res.status(404).json({message:"todo with id = " + id + " not found"})
    
    user.todos.splice(user.todos.indexOf(todo),1);
    user.save().then(()=>{
        res.json({message:"deleted with success",data:todo})
    })
    .catch(err=>{
        res.status(500).json({message:"please try again later"})
        })
      
}

module.exports.updateTodo = async(req,res)=>{
    let id=req.params.id
    let {title, completed } = req.body
    let user = await User.findById(req.session.userId) 

    let todo=user.todos.find(element=>element.id==id)
    if(!todo)
        return res.status(404).json({message:"todo with id = " + id + " not found"})
    
    todo.title = title || todo.title
    todo.completed = completed==undefined?todo.completed:completed

    user.save().then(()=>res.json(todo))
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"please try again later"})
    })

}
