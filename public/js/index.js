
import Login from "./login/login.js";
import Register from "./register/register.js";
import { auth } from "./services/auth.js";
import Todos from "./todos/todos.js";


let app = document.querySelector('#app')
const router = async () => {
    await auth.checkAuth()
    console.log(auth.isConnected);
    let routes = [
        {
            path: "/", component: Login , authorized : !auth.isConnected 
        },
        {
            path: "/login", component: Login , authorized : !auth.isConnected
        },
        {
            path: "/register", component: Register , authorized : !auth.isConnected
        },
        {
            path: "/app", component: Todos , authorized : auth.isConnected
        }
    ]

    let currentRoute = routes.find(r => window.location.pathname == r.path)
    let defaultRoute= auth.isConnected?routes[3]:routes[1]

    if (!currentRoute ||!currentRoute.authorized ) {
        history.pushState(null, null, defaultRoute.path)
        currentRoute = defaultRoute
    }
    let currentComponent = new currentRoute.component()
    app.innerHTML = await currentComponent.getTemplate()
    await currentComponent.init()
}



export const navigateTo = (url) => {
    history.pushState(null, null, url)
    auth.checkAuth()
    router();
}
document.addEventListener('DOMContentLoaded', () => {
    
    document.body.addEventListener('click', (e) => {
        if (!e.target.matches('.samePageLink')) return
        e.preventDefault()
        if (!e.target.href) return
        navigateTo(e.target.href)
        auth.checkAuth()
    })
})

window.addEventListener('popstate', (e) => {
    e.preventDefault()
    console.log("url changed");
    auth.checkAuth()
    router();
})

router()