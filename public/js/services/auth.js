import { navigateTo } from "../index.js";
import { urlApi } from "../tools.js";


class AuthService {
    isConnected = false;
    user ={};
    constructor(){
       
    }
   async checkAuth() {
        let data = await(await fetch(urlApi + "users/isConnected")).json()
        this.isConnected = data.isConnected;
        this.user.name = data.name;
        return data;
    }
    //login function
    async login(data){
        if (!data.login || !data.pwd) {
            return alert('credentials required')
        }
        try{
            let response =await fetch(urlApi+"users/login",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok)
                {
                    
                   console.log('authenticated');
                    await this.checkAuth();
                    return navigateTo('/app')
                }
            let res=  await response.json()
            alert(res.message)
            }
            catch(e)
            {
                console.log(e)
                alert("error in login function")
            }
    }
     
   async register(data){
        try{
           
           let response =await fetch(urlApi+"users/register",{
            method:"POST",
            body:JSON.stringify({login:data.login,pwd:data.pwd1}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok)
            {
                navigateTo('/login')
                console.log('registered');
                return this.checkAuth(); 
            }
        let res=  await response.json()
        alert(res.message)
        
        }
        catch(e)
        {
            console.log(e)
            alert("error in register")
        }
    }
    async logout(){
   
        let response = await fetch(urlApi+"users/logout",{
            method:"GET",
        })
        if(response.ok)
            {
                auth.checkAuth()
                navigateTo('/login')
               return  
            }
        console.log(response.json());
        
    
    }

}
export let auth = new AuthService()