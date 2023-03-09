import Component from "../component.js";
import { auth } from "../services/auth.js";
import { formToJson } from "../tools.js";

export default class Register extends Component{
    registerForm;
    registerData;
    constructor()
    {
        super("register")
    }
    async getTemplate()
    {       
            const response = await fetch('./js/register/register-html.html')
            const text = await response.text()
            return text;
    }
    async init()
    {
        this.registerForm = document.forms['registerForm']
        this.registerForm.addEventListener('submit',async (e) => {
            e.preventDefault();
            let data = formToJson('registerForm');
            if (data.pwd1!=data.pwd2) {

                return alert('missmatched password')
            }
            console.log(data);
           await auth.register(data)
        })
    }
}