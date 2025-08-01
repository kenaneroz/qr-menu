import { IoMdClose } from "react-icons/io";

export default function Details(props) {
    let foundProduct
    if(props.basket.length > 0) {
        foundProduct = props.basket.find(product => product.title == props.currentProduct.title)
    }

    return (
        <div className={`bg-gray-500 w-full h-screen z-999 absolute bottom-0 left-0 transform ${props.detailsActive ? 'translate-y-[0]' : 'translate-y-[100%]'} transition duration-250 ease-in-out overflow-y-scroll text-center p-[25px]`}>
            <IoMdClose 
                className="cursor-pointer text-white text-2xl"
                onClick={() => props.setDetailsActive(false)}
            />
            <div>
                <div 
                    style={{backgroundImage: `url('')`}}
                    className="bg-gray-400 w-full aspect-square relative mt-[50px] mb-[25px]"
                >   
                    {
                        (foundProduct && foundProduct.count > 0)
                        ?
                        <div className="absolute bottom-[25px] right-[25px] flex items-center gap-[5px] pt-[10px] pb-[5px]">
                            <button 
                                className="bg-gray-300 h-[35px] w-[35px] hover:bg-red-300 hover:scale-90 hover:shadow-inner transition duration-300"
                                onClick={props.decreaseCount}
                            >-</button>
                            <p className="text-white">{foundProduct.count}</p>
                            <button 
                                className="bg-gray-300 h-[35px] w-[35px] hover:bg-green-300 hover:scale-90 hover:shadow-inner transition duration-300"
                                onClick={props.increaseCount}
                            >+</button>
                        </div>
                        :
                        <button
                            className="cursor-pointer bg-gray-300 h-[40px] w-[150px] absolute bottom-[25px] right-[25px] hover:bg-green-300 hover:scale-90 hover:shadow-inner transition duration-300"
                            onClick={props.addToBasket}
                        >Add to Basket</button>
                    }
                </div>
                <h3 className="text-white">{props.currentProduct && props.currentProduct.title}</h3>
                <p className="text-white">{props.currentProduct && props.currentProduct.description}</p>
            </div>
        </div>
    )
}