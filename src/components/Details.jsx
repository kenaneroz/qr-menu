import { IoMdClose } from "react-icons/io";

export default function Details(props) {
    return (
        <div className="bg-gray-500 w-full h-[750px] z-999 absolute bottom-0 left-0 text-center p-[25px]">
            <IoMdClose 
                className="cursor-pointer text-white text-3xl"
                onClick={() => props.setDetailsActive(false)}
            />
            <div>
                <div 
                    style={{backgroundImage: `url('')`}}
                    className="bg-gray-400 w-full aspect-square relative mt-[50px] mb-[25px]"
                >
                    <button
                        className="cursor-pointer bg-gray-300 h-[40px] w-[150px] absolute bottom-[25px] right-[25px]"
                        onClick={props.addToBasket}
                    >Add to Basket</button>
                </div>
                <h3 className="text-white">{props.productToShowDetails.title || ''}</h3>
                <p className="text-white">{props.productToShowDetails.description || ''}</p>
            </div>
        </div>
    )
}