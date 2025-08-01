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
        />
    })

    return (
        <div className={`bg-gray-500 w-full h-screen z-999 absolute bottom-0 left-0 transform ${props.basketActive ? 'translate-x-[0]' : 'translate-x-[100%]'} transition duration-250 ease-in-out overflow-y-scroll p-[25px]`}>
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