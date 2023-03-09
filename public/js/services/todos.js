import { urlApi } from "../tools.js";
import { auth } from "./auth.js"

class TodosService {
    async getAll() {

        if (!auth.isConnected) return []
        console.log( await (await fetch(`${urlApi}todos`)).json());
        return  await (await fetch(`${urlApi}todos`)).json()

    }
    async insertTodo(todo){
       let response =await (await ( fetch(urlApi+"todos",{
            method:"POST",
            body:JSON.stringify(todo),
            headers:{
                "Content-Type":"application/json"
            }
        }))).json()
        
        let insertedTodo ;
        response.todos.forEach(element => {
            insertedTodo = element
        });
        return insertedTodo;
       
    }

    deleteTodo(event, id,tr) {

        fetch(`${urlApi}todos/${id}`, { method: 'DELETE' }).then(response => response.json())
            .then(data => {
                console.log(data);
                tr.remove()
            }).catch(err => console.log(err))
    }

    async updateTodo(todo,todoId){
        let response =await (await ( fetch(urlApi+"todos/"+todoId,{
            method:"PUT",
            body:JSON.stringify(todo),
            headers:{
                "Content-Type":"application/json"
            }
        }))).json()
        
        console.log(response);
        return response;
    }
}
export let todosService = new TodosService()