class CartApi{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    async findAllPizzas(){
       try {
           const response = await fetch(`${this.baseUrl}/api/pizzas`);

           if(!response.ok){
               const error = await response.json();

               throw new Error(error.message || "Ошибка добавления в корзину");
           }

           return await response.json();
       }
       catch(err){
        console.warn(err.message);
       }
    }
}

export default CartApi;