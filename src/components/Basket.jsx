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
            selectedLanguage={props.selectedLanguage}
            langs={props.langs}
        />
    })

    return (
        <div className={`bg-[#50110A] h-dvh w-full max-w-lg absolute top-0 left-0 p-[25px]`}>
            <div className="text-white flex justify-between mb-[50px]">
                <IoMdClose 
                    className="cursor-pointer text-2xl"
                    onClick={props.hideBasket}
                />
                <button 
                    className="cursor-pointer"
                    onClick={() => props.setBasket([])}    
                >{props.langs.translations[props.selectedLanguage].clearBasketButton}</button>
            </div>
            <div>{productsInBasket}</div>
            {
                props.total != 0
                &&
                <div className="flex items-end gap-[5px] pt-[25px]">
                    <p className="text-white">{props.langs.translations[props.selectedLanguage].checkout}:</p>
                    <p className="text-white text-xl font-bold">{props.langs.translations[props.selectedLanguage].currency}{props.total}</p>
                </div>
            }
        </div>
    )
}