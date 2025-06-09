// import { useState } from 'react'
import './App.css'
import {RenderCart,RenderPizza,FindPizza} from './Card'
import {Pizza,Product} from "./AppWrapper";

export interface OnAddToCart {
    pizza : Pizza[];
    onAddToCart: (id: string) => void;
    cart:Product[];
}

export interface UpdateTotal {
    pizza : Product[];
    updateTotal: (id: string) => void;
}


export function Find({pizza}: { pizza: Pizza[] }) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
    return (
        <>
            {pizza.map((pizzas:Pizza) => (
                <FindPizza
                    key={pizzas._id}
                    _id={pizzas._id}
                    name={pizzas.name}
                    price={pizzas.price}
                    img={pizzas.img}
                    ingredient={pizzas.ingredient}
                />
            ))}
        </>
    )
}

export function App({pizza,onAddToCart,cart}:OnAddToCart) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
  return (
      <>
          {pizza.map((pizzas:Pizza) => (
                <RenderCart
                key={pizzas._id}
                _id={pizzas._id}
                img={pizzas.img}
                name={pizzas.name}
                price={pizzas.price}
                onAddToCart={onAddToCart}
                cart={cart}
                />
          ))}
      </>
  )
}
export function Cart({pizza,updateTotal}:UpdateTotal) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
  return (
      <>
          {pizza.map((pizzas:Product) => (
                <RenderPizza
                key={pizzas.pizzaId._id}
                _id={pizzas.pizzaId._id}
                img={pizzas.pizzaId.img}
                name={pizzas.pizzaId.name}
                price={pizzas.pizzaId.price}
                quantity={pizzas.quantity}
                updateTotal={updateTotal}
                />
          ))}
      </>
  )
}


