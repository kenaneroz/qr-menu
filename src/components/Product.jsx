export default function Product(props) {
    return (
        <div 
            style={{backgroundImage: `url(${props.imgUrl})`}}
            className="w-full min-w-0 aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px] p-[10px]"
            onClick={props.onClick}
        >
            <div className="absolute inset-0 bg-[#50110A]/75 rounded-[25px]"></div>
            <div className="relative z-10 flex justify-center items-center h-full">
                <p className="text-white text-center">{props.title}</p>
            </div>
        </div>
    );
}
