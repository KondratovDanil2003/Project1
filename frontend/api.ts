class CartApi{
    baseUrl: string;
    constructor(baseUrl: string) {
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
       catch(err:any){
        console.warn(err.message);
       }
    }

    async addPizza(userId:string,pizzaId:string,quantity:number){
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
        catch(err:any){
            console.warn(err.message);
        }
    }
    async cartPizzas(userId:string){
        try{
            console.log(userId);
            const response = await fetch(`${this.baseUrl}/api/cart/${userId}`);
            if(!response.ok){
                const error = await response.json();
                console.warn(error.message || "Ошибка добавления в корзину");
                // throw new Error(error.message);
            }

            return await response.json();
        }
        catch(err:any){
            console.warn(err.message + ": " + userId);
        }
    }
    async minusPizza(userId:string,pizzaId:string){
        try{
            const response = await fetch(`${this.baseUrl}/api/cart/increment/${userId}/${pizzaId}`,{
                method: "PATCH"
            });
            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
        }
        catch(err:any){
            console.warn(err.message);
        }
    }
    async plusPizza(userId:string,pizzaId:string){
        try{
            const response = await fetch(`${this.baseUrl}/api/cart/decrement/${userId}/${pizzaId}`,{
                method: "PATCH"
            });
            if(!response.ok){
                const error = await response.json();
                // throw new Error(error.message);
                console.warn(error.message || "Ошибка добавления в корзину");
            }
            return await response.json();
        }
        catch(err:any){
            console.warn(err.message);

        }
    }
}

export default CartApi;