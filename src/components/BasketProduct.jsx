export default function BasketProduct(props) {
    return (
        <div className="cursor-pointer flex items-center mb-[10px]">
            <img src="img" alt="" className="bg-gray-400 h-[150px] w-[150px] mr-[35px]" />
            <div>
                <p>{props.title} x{props.count}</p>
                <div className="flex gap-[5px] pt-[10px] pb-[5px]">
                    <button className="bg-gray-300 h-[35px] w-[35px]">-</button>
                    <button className="bg-gray-300 h-[35px] w-[35px]">+</button>
                </div>
                <button className="text-white" onClick={() => props.setBasket(products => products.filter(prod => prod !== props.product))}>Remove</button>
            </div>
        </div>
    )
}