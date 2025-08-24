export default function Category(props) {
    return (
        <div 
            key={props.id} id={props.id}
            className="bg-[#F5F5F8] h-max text-center rounded-[25px] p-[15px]"
            onClick={props.setSelectedCategory}
        >
            <img 
                src={props.bgUrl} alt=""
                className="aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px] mb-[5px]"
            />
            <p className="text-[#50110A]">{props.title}</p>
        </div>
    )
}
