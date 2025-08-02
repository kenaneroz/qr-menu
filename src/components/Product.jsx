export default function Product(props) {
    return (
        <div 
            style={{ backgroundImage: `url(${props.imgUrl})` }}
            className="w-full aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px] overflow-hidden"
            onClick={props.onClick}
        >
            <div className="absolute inset-0 bg-[#50110A]/75 z-10"></div>

            <div className="absolute inset-0 z-20 flex justify-center items-center">
                <p className="text-white text-center px-[10px]">
                    {props.title}
                </p>
            </div>
        </div>
    );
}
