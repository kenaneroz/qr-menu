export default function Product(props) {
    return (
        <div 
            style={{ backgroundImage: `url(${props.imgUrl})` }}
            className="w-full min-w-0 flex-shrink-0 max-w-full aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px] overflow-hidden"
            onClick={props.onClick}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#50110A]/75 z-10"></div>

            {/* Centered content */}
            <div className="absolute inset-0 z-20 flex justify-center items-center">
                <p className="text-white text-center text-base leading-tight px-2">
                    {props.title}
                </p>
            </div>
        </div>
    );
}
