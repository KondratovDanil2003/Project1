import { useState } from 'react'
import './App.css'


function RenderCart( {id, img, name, price} ) {


    const [isAdded, setIsAdded] = useState(false);


    const addClickBtn =() => {
        setIsAdded(!isAdded);
    }

    return (
        <>
            <div key={id} className="cardPizza">
                <img className="cardImgPizza" src={img} alt="card"/>
                <p className="cardNamePizza">{name}</p>
                <p className="cardPricePizza">{price} ₽</p>
                <button onClick={() => addClickBtn(id)} id="byBtn" className="btn">
                    <div id={`box-${id}`} className="box">
                        <div className="red"></div>
                        <div className="blue"></div>
                    </div>
                    {isAdded ? 'Удалить' : 'Купить'}</button>
            </div></>
    )
}

export default RenderCart;