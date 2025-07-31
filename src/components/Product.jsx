export default function Product(props) {
    return (
        <div 
            style={{backgroundImage: `url(${props.imgUrl})`}}
            className="cursor-pointer bg-black bg-cover aspect-square relative flex justify-center border border-white"
            onClick={props.onClick}
        >
            <h3 className="text-white absolute bottom-2">{props.title}</h3>
        </div>
    )
}