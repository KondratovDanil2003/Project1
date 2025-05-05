import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartApi from "../api.js";

const cartApi = new CartApi("http://localhost:5000");

cartApi.findAllPizzas().then(data => {
    console.log(data);

        // createRoot(document.getElementById('root')).render(
        //     <StrictMode>
        //         <App pizza={data} />
        //     </StrictMode>
        // )


}).catch(err => console.log(err.message));


