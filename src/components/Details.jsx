import { IoMdClose } from "react-icons/io";

export default function Details(props) {
    let foundProduct
    if(props.basket.length > 0) {
        foundProduct = props.basket.find(product => product.title == props.currentProduct.title)
    }

    return (
        <div className={`bg-[#50110A] h-dvh w-full max-w-lg z-999 absolute top-0 left-0 text-center p-[25px]`}>
            <IoMdClose 
                className="cursor-pointer text-white text-2xl"
                onClick={() => props.setDetailsActive(false)}
            />
            <div>
                <div 
                    style={{backgroundImage: props.currentProduct?.imgUrl ? `url(${props.currentProduct.imgUrl})` : ''}}
                    className="bg-no-repeat bg-center bg-cover w-full aspect-square relative rounded-[25px] mt-[50px] mb-[25px]"
                >   
                    {
                        (foundProduct && foundProduct.count > 0)
                        ?
                        <div className="absolute bottom-[25px] right-[25px] flex items-center border border-white">
                            <button 
                                className="bg-white text-[#50110A] h-[30px] w-[30px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                                onClick={props.decreaseCount}
                            >-</button>
                            <textarea 
                                className="bg-transparent h-[25px] w-[30px] resize-none overflow-hidden text-white text-center" 
                                value={foundProduct.count}
                                onChange={props.setCount}
                            ></textarea> 
                            <button 
                                className="bg-white text-[#50110A] h-[30px] w-[30px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                                onClick={props.increaseCount}
                            >+</button>
                        </div>
                        :
                        <button
                            className="cursor-pointer bg-white text-[#50110A] h-[40px] w-[50px] absolute bottom-[25px] right-[25px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300 rounded-full"
                            onClick={props.addToBasket}
                        >{props.langs.translations[props.selectedLanguage].detailsAddButton}</button>
                    }
                </div>
                <div className="flex justify-center items-center gap-[10px]">
                    <h3 className="text-white">{props.currentProduct && props.currentProduct.title}</h3>
                    <p className="bg-white text-[#50110A] w-[30px] h-[30px] flex justify-center items-center rounded-full">{props.langs.translations[props.selectedLanguage].currency}{props.currentProduct && props.currentProduct.price}</p>
                </div>
                <p className="text-white">{props.currentProduct && props.currentProduct.description}</p>
            </div>
        </div>
    )
}