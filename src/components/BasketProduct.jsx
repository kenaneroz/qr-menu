export default function BasketProduct(props) {
    return (
        <div className="flex items-center mb-[10px]">
            <img src={props.imgUrl} alt="" className="bg-gray-400 h-[150px] w-[150px] mr-[35px]" />
            <div>
                <p className="text-white">{props.title}</p>
                <div className="flex items-center gap-[5px] pt-[10px] pb-[5px]">
                    <button 
                        className="bg-white text-[#50110A] h-[35px] w-[35px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                        onClick={props.decreaseCount}
                    >-</button>
                    <p className="text-white">{props.count}</p>
                    <button 
                        className="bg-white text-[#50110A] h-[35px] w-[35px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                        onClick={props.increaseCount}
                    >+</button>
                </div>
                <button className="cursor-pointer text-white" onClick={() => props.setBasket(products => products.filter(product => product.title !== props.title))}>Remove</button>
            </div>
        </div>
    )
}