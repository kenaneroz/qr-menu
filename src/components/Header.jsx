import { MdOutlineShoppingCart } from "react-icons/md"
import { MdOutlineShoppingBasket } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";

export default function Header(props) {
    return (
        <header className="bg-[url(/business.jpg)] bg-cover bg-center pb-[125px]">
            <div className="bg-white flex justify-between items-center px-[25px] py-[10px]">
                <select name="languages" id="languages" className="appearance-none cursor-pointer bg-[#50110A] text-white h-max rounded-full p-[2px]" onChange={(e) => props.setSelectedLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Turkish">Türkçe</option>
                </select>
                <div className="flex items-center gap-[10px]">
                    <LuSearch className="text-[#50110A] text-2xl" />
                    <div className="cursor-pointer flex items-start">
                        <MdOutlineShoppingCart className="text-[#50110A] text-2xl" onClick={props.showBasket} />
                        <small className="bg-[#50110A] text-white h-[17px] aspect-square flex justify-center items-center rounded-full">{props.basketItemsCount}</small>
                    </div>
                    <GiHamburgerMenu className="text-[#50110A] text-2xl" />
                </div>
            </div>
            <div className="flex justify-center pt-[50px]"><img src="/logo.png" alt="Logo" className="h-[75px]" /></div>
        </header>
    )
}