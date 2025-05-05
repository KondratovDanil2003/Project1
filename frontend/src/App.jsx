// import { useState } from 'react'
import './App.css'
import RenderCart from './Card.jsx'

function App({pizza}) {

    // всегда должна быть обёртка, потому что передаём только 1 элемент, а в нём может быть сколько угодно элементов
  return (
      <>
          {pizza.map((pizzas,index) => (
                <RenderCart
                key={index}
                id={pizzas._id}
                img={pizzas.img}
                name={pizzas.name}
                price={pizzas.price}
                />
          ))}
      </>
  )
}

export default App
