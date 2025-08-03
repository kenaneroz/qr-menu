import { IoMdClose } from "react-icons/io";
import BasketProduct from "./BasketProduct";

export default function Basket(props) {
    const productsInBasket = props.basket.map(product => {
        return <BasketProduct 
            imgUrl={product.imgUrl}
            title={product.title}
            setBasket={props.setBasket}
            count={product.count}
            increaseCount={() => props.increaseCount(product)}
            decreaseCount={() => props.decreaseCount(product)}
            setCount={(e) => props.setCount(product, JSON.parse(e.target.value))}
        />
    })

    return (
        <div className={`bg-[#50110A] h-dvh w-full absolute top-0 left-0 p-[25px]`}>
            <div className="text-white flex justify-between mb-[50px]">
                <IoMdClose 
                    className="cursor-pointer text-2xl"
                    onClick={props.hideBasket}
                />
                <button 
                    className="cursor-pointer"
                    onClick={() => props.setBasket([])}    
                >Clear Basket</button>
            </div>
            <div>{productsInBasket}</div>
        </div>
    )
}