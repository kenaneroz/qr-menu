import { IoMdClose } from "react-icons/io"

export default function Details(props) {
    const foundedProduct = props.basket.find(product => product.id == props.selectedProduct.id)

    return (
        <div className={`bg-[#50110A] h-dvh w-full max-w-lg z-999 absolute top-0 left-0 text-center p-[25px]`}>
            <IoMdClose 
                className="cursor-pointer text-white text-2xl"
                onClick={props.hideProductDetails}
            />
            <div>
                <img
                    src={props.selectedProduct.bgUrl} alt=""
                    className="w-full aspect-square rounded-[75px] mt-[50px]"
                />
                <div className="flex justify-center my-[15px]">
                    {
                        foundedProduct && foundedProduct.count > 0
                        ?
                        <div className="max-w-max flex items-center my-[5px]">
                            <button 
                                className="text-white h-[30px] w-[30px] hover:scale-90 transition duration-300 border border-white/50 rounded-[10px]"
                                onClick={props.decreaseCount}
                            >-</button>
                            <p className="bg-transparent text-white resize-none overflow-hidden text-center px-[7px]">{foundedProduct.count}</p> 
                            <button 
                                className="bg-white text-[#50110A] h-[30px] w-[30px] hover:scale-90 transition duration-300 rounded-[10px]"
                                onClick={props.increaseCount}
                            >+</button>
                        </div>
                        :
                        <button 
                            className="bg-white text-[#50110A] w-[50%] absolute bottom-[50px] rounded-full py-[15px]"
                            onClick={props.addToBasket}
                        >{props.langs.translations[props.selectedLanguage].detailsAddButton}</button>
                    }
                </div>
                <div className="flex justify-center items-center gap-[10px]">
                    <h3 className="text-white">{props.selectedProduct && props.selectedProduct.title}</h3>
                    <p className="bg-white text-[#50110A] text-lg font-[500] flex justify-center items-center rounded-full">{props.langs.translations[props.selectedLanguage].currency}{props.selectedProduct && props.selectedProduct.price}</p>
                </div>
                <p className="text-white">{props.selectedProduct && props.selectedProduct.description}</p>
            </div>
        </div>
    )
}