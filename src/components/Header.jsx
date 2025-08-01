import { MdOutlineShoppingCart } from "react-icons/md"

export default function Header(props) {
    return (
        <header className="bg-[url(src/images/business.png)] bg-cover bg-center px-[25px] pt-[10px] pb-[125px]">
            <div className="flex justify-between">
                <select name="languages" id="languages" className="appearance-none cursor-pointer bg-[#F5F5F8] text-[#50110A] h-max rounded-full p-[5px]" onChange={(e) => props.setSelectedLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Turkish">Türkçe</option>
                </select>
                <MdOutlineShoppingCart className="cursor-pointer bg-[#F5F5F8] text-[#50110A] text-4xl rounded-[20px] p-[7px]" onClick={props.showBasket} />
            </div>
            <div className="flex justify-center pt-[50px]"><img src="src/images/logo.png" alt="Logo" className="h-[75px]" /></div>
        </header>
    )
}