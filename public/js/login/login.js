import Component from "../component.js";
import { formToJson } from "../tools.js";
import { auth } from "../services/auth.js";

export default class Login extends Component {
    loginForm;
    loginData;
    constructor() {
        super("login")
      
        

    }
    async getTemplate() {
        const response = await fetch('./js/login/login-html.html')
        const text = await response.text()
        return text;
    }
    async init() {
        this.loginForm = document.forms['loginForm']
        this.loginForm.addEventListener('submit',async (e) => {
            e.preventDefault();
            let data = formToJson('loginForm');
            console.log(data);
           await auth.login(data)
        })
    }

}