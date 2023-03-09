import Component from "../component.js";
import { auth } from "../services/auth.js";
import { todosService } from "../services/todos.js";
import { formToJson } from "../tools.js";

export default class Todos extends Component {
    username = auth.user.name;
    todos ;
    popUpUpdate ;
    updateHandler;

     constructor() {
        super("todos")

    }
    async getTemplate() {
        const response = await fetch('./js/todos/todos-html.html')
        const text = await response.text()
        return text;
    }
    async init() {
        
        this.popUpUpdate =document.querySelector('#updatePopUp')
        this.popUpUpdate.hidden = true
        this.todos = await todosService.getAll()
        document.getElementById('username').innerText = "welcome " + this.username
        document.getElementById('logout').addEventListener('click', () => {
            auth.logout();
        })

        this.todos.forEach(todo => {
                this.addTodoToTable(todo)
            });

        document.forms['form'].addEventListener('submit', async (e) => {
            e.preventDefault();
            let data = formToJson('form');
            data.completed = data.completed == 'true' ? true : false
            if (!data.title) {
                return alert('all fields are required')
            }

            let todo = await todosService.insertTodo(data)
            this.addTodoToTable(todo, true)
        })


    }
    addTodoToTable(todo, b = false) {

        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")


        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        td1.innerText = todo.title
        td2.innerText = todo.completed

        td3.innerHTML = '<div class="d-flex justify-content-around"><button class="btn btn-danger "  id="d.' + todo._id + '" >delete</button><button class="btn btn-warning " id="u.' + todo._id + '" >update</button></div>'
        if (b) {
            tr.classList.add("bg-success");
            tr.classList.add("text-white");
        }
        document.getElementById("tbody").appendChild(tr)
        document.getElementById('d.' + todo._id).addEventListener("click", todosService.deleteTodo.bind(null, event, todo._id,tr));
        document.getElementById('u.' + todo._id).addEventListener("click", ()=>{
            this.toggleUpdatePopUp(todo._id)
        });
    }
    toggleUpdatePopUp(todoId){
        
        this.popUpUpdate.hidden = !this.popUpUpdate.hidden;
        if (this.popUpUpdate.hidden) return document.querySelector('#updateBtn').removeEventListener("click")
        document.querySelector('#cancelBtn').addEventListener('click', ()=>{
            this.toggleUpdatePopUp()
        })
        document.querySelector('#updateBtn').addEventListener('click' , this.updateHandler=  async()=>{
            console.log(todoId);
            let data = formToJson('updateForm');
            data.completed = data.completed == 'true' ? true : false
            

            let todo = await todosService.updateTodo(data,todoId)
            document.getElementById('u.' + todoId).parentElement.parentElement.parentElement.remove()
            this.addTodoToTable(todo,true)
            
            this.popUpUpdate.hidden = !this.popUpUpdate.hidden;
            document.querySelector('#updateBtn').removeEventListener("click",this.updateHandler)

        })

    }
}