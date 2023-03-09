export  default  class Component {
    
    constructor(title)
    {
        this.setTitle(title)
    }
    setTitle(title)
    {
        document.title =title
    }
    async getTemplate()
    {
            return "<h1>uninitilized template</h1>"
    }
    init()
    {

        
    }

    
}