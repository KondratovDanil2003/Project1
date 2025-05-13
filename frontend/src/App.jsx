// import { useState } from 'react'
import './App.css'
import {RenderCart,RenderPizza} from './Card.jsx'

export function App({pizza,onAddToCart}) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
  return (
      <>
          {pizza.map((pizzas) => (
                <RenderCart
                key={pizzas._id}
                id={pizzas._id}
                img={pizzas.img}
                name={pizzas.name}
                price={pizzas.price}
                onAddToCart={onAddToCart}
                />
          ))}
      </>
  )
}
export function Cart({pizza}) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
  return (
      <>
          {pizza.map((pizzas) => (
                <RenderPizza
                key={pizzas.pizzaId._id}
                id={pizzas.pizzaId._id}
                img={pizzas.pizzaId.img}
                name={pizzas.pizzaId.name}
                price={pizzas.pizzaId.price}
                quantity={pizzas.quantity}
                />
          ))}
      </>
  )
}


