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

    async addPizza(userId,pizzaId,quantity){
        try{
            const response = await fetch(`${this.baseUrl}/api/cart`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, pizzaId, quantity }),
            });
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
    async cartPizzas(userId){
        try{
            console.log(userId);
            const response = await fetch(`${this.baseUrl}/api/cart/${userId}`);
            if(!response.ok){
                const error = await response.json();

                throw new Error(error.message);
            }

            return await response.json();
        }
        catch(err){
            console.warn(err.message + ": " + userId);
        }
    }
}

export default CartApi;