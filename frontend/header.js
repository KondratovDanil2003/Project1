import CartApi from "./api.js";

const cartApi = new CartApi("http://localhost:5000");

cartApi.findAllPizzas().then(data => {
    console.log(data);
}).catch(err => console.log(err.message));