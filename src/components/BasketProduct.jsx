export default function BasketProduct(props) {
    return (
        <div key={props.id} className="bg-white flex items-center rounded-[35px] mb-[10px] p-[10px] pr-[25px]">
            <img src={props.imgUrl} alt="" className="bg-gray-400 h-[125px] w-[125px] rounded-[25px] mr-[20px]" />
            <div className="w-full">
                <div className="w-full flex justify-between">
                    <p className="text-[#50110A]">{props.title}</p>
                    <button 
                        className="cursor-pointer text-[#50110A] text-sm"
                        onClick={props.removeFromBasket}
                    >{props.langs.translations[props.selectedLanguage].detailsProductRemoveButton}</button>
                </div>
                <div className="max-w-max flex items-center my-[7px]">
                    <button 
                        className="text-[#50110A] h-[30px] w-[30px] hover:scale-90 transition duration-300 border border-[#50110A]/50 rounded-[10px]"
                        onClick={props.decreaseCount}
                    >-</button>
                    <p className="bg-transparent text-[#50110A] resize-none overflow-hidden text-center px-[7px]">{props.count}</p> 
                    <button 
                        className="bg-[#50110A] text-white h-[30px] w-[30px] hover:scale-90 transition duration-300 rounded-[10px]"
                        onClick={props.increaseCount}
                    >+</button>
                </div>
            </div>
        </div>
    )
}