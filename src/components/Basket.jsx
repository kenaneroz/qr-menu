import { IoMdClose } from "react-icons/io";
import BasketProduct from "./BasketProduct";
import { useEffect } from "react";

export default function Basket(props) {
    const productsInBasket = props.basket.map(product => {
        return <BasketProduct 
            imgUrl={product.imgUrl}
            title={product.title}
            product={product}
            setBasket={props.setBasket}
            count={product.count}
        />
    })

    return (
        <div className="bg-gray-500 w-full h-[750px] z-999 absolute bottom-0 left-0 p-[25px]">
            <div className="text-white flex justify-between mb-[50px]">
                <button 
                    className="cursor-pointer"
                    onClick={() => props.setBasket([])}    
                >Clear Basket</button>
                <IoMdClose 
                    className="cursor-pointer text-xl"
                    onClick={props.hideBasket}
                />
            </div>
            <div>{productsInBasket}</div>
        </div>
    )
}