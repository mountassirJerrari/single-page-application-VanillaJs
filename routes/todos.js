const express = require("express");
const { getAll, getTodo, insertTodo, deleteTodo, updateTodo } = require("../controllers/todos");

const router= express.Router();

router.get("/",getAll)

router.get("/:id",getTodo)

router.post("/",insertTodo)

router.delete("/:id",deleteTodo)

router.put("/:id",updateTodo)

module.exports=router