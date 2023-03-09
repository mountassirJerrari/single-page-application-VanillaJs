export const urlApi = "http://localhost:8000/"
export const formToJson=(formName)=>{
    let form=document.forms[formName]
    let formData=new FormData(form)
    let data={}
    formData.forEach((element,ok)=>data[ok]=element)
    return data;
}