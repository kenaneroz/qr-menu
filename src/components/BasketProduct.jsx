export default function BasketProduct(props) {
    return (
        <div className="flex items-center mb-[10px]">
            <img src={props.imgUrl} alt="" className="bg-gray-400 h-[150px] w-[150px] rounded-[25px] mr-[35px]" />
            <div>
                <p className="text-white">{props.title}</p>
                <div className="max-w-max flex items-center border border-white my-[5px]">
                    <button 
                        className="bg-white text-[#50110A] h-[30px] w-[30px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                        onClick={props.decreaseCount}
                    >-</button>
                    <textarea 
                        className="bg-transparent h-[25px] w-[30px] resize-none overflow-hidden text-white text-center" 
                        value={props.count}
                        onChange={props.setCount}
                    ></textarea> 
                    <button 
                        className="bg-white text-[#50110A] h-[30px] w-[30px] hover:bg-[#50110A] hover:text-white hover:scale-90 hover:shadow-inner transition duration-300"
                        onClick={props.increaseCount}
                    >+</button>
                </div>
                <button className="cursor-pointer text-white" onClick={() => props.setBasket(products => products.filter(product => product.title !== props.title))}>{props.langs.translations[props.selectedLanguage].detailsProductRemoveButton}</button>
            </div>
        </div>
    )
}