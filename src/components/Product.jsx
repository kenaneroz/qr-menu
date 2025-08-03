export default function Product(props) {
    return (
        <div 
            style={{ backgroundImage: `url(${props.imgUrl})` }}
            className="aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px]"
            onClick={props.onClick}
        >
            <div className="absolute inset-0 bg-[#50110A]/75 z-10 rounded-[25px]"></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center gap-[5px] p-[10px]">
                <p className="text-white">{props.title}</p>
                <p className={`${props.price == 'none' ? 'hidden' : ''} bg-white text-[#50110A] min-h-[30px] min-w-[30px] flex justify-center items-center rounded-full`}>${props.price}</p>
            </div>
        </div>
    );
}
