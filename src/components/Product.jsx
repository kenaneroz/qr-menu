export default function Product(props) {
    return (
        <div 
            key={props.id}
            className="bg-[#50110A]/5 h-max flex flex-col items-center text-center rounded-[35px] p-[15px]"
            onClick={() => {
                props.setSelectedProduct()
                props.showProductDetails()
            }}
        >
            <img 
                src={props.bgUrl} alt=""
                className="aspect-square bg-no-repeat bg-center bg-cover cursor-pointer relative rounded-[25px]"
            />
            <p className="text-[#50110A] mt-[5px] mb-[10px]">{props.title}</p>
            <p className={`${props.price == 'none' ? 'hidden' : ''} bg-[#50110A]/10 text-[#50110A] min-h-[30px] w-[50%] font-[500] text-lg flex justify-center items-center rounded-[15px]`}>{props.langs.translations[props.selectedLanguage].currency}{props.price}</p>
        </div>
    );
}
