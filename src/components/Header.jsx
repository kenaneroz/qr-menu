import { MdOutlineShoppingCart } from "react-icons/md"
import { MdOutlineShoppingBasket } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";
import { LuSearchX } from "react-icons/lu";
import { GiPhone } from "react-icons/gi";
import { TbMapPin } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function Header(props) {
    return (
        <header className="bg-[url(/business.jpg)] bg-cover bg-center pb-[125px]">
            <div className="bg-white flex justify-between items-center px-[25px] py-[10px]">
                <select name="languages" id="languages" className="appearance-none cursor-pointer bg-[#50110A] text-white h-max rounded-full p-[2px]" onChange={(e) => props.setSelectedLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Turkish">Türkçe</option>
                </select>
                <div className="flex items-center gap-[10px]">
                    {
                        props.searchBar &&
                        <textarea 
                            placeholder="Search"
                            value={props.searchTerm}
                            onChange={(e) => props.setSearchTerm(e.target.value)}
                            className="w-[125px] placeholder-[#50110A]/25 resize-none text-sm rounded-full border border-[#50110A] px-[10px] py-[3px]"
                            rows={1}
                        ></textarea>
                    }
                    {
                        props.searchBar 
                        ?
                        <LuSearchX 
                            className="cursor-pointer min-w-min text-[#50110A] text-2xl"
                            onClick={props.showHideSearchBar}
                        />
                        :
                        <LuSearch
                            className="cursor-pointer min-w-min text-[#50110A] text-2xl"
                            onClick={props.showHideSearchBar}
                        />
                    }
                    <div 
                        className="cursor-pointer flex items-start"
                        onClick={props.showBasket}    
                    >
                        <MdOutlineShoppingCart className="text-[#50110A] text-2xl" />
                        <small className="bg-[#50110A] text-white h-[17px] aspect-square flex justify-center items-center rounded-full">{props.basketItemsCount}</small>
                    </div>
                    <GiHamburgerMenu 
                        className="cursor-pointer text-[#50110A] text-2xl"
                        onClick={props.showSidebar}
                    />
                    {
                        props.sidebar &&
                        <div className="bg-[#50110A] text-white h-dvh w-[65%] absolute top-0 left-0 z-50 p-[25px]">
                            <IoMdClose 
                                className="cursor-pointer text-xl mb-[25px]" 
                                onClick={props.hideSidebar}
                            />
                            <div>
                                <img src="/business.jpg" alt="Business" className="h-[100px] rounded-[25px]" />
                                <p className="text-xl font-bold pt-[5px]">Burgers</p>
                            </div>
                            <div className="flex flex-col gap-[2px] py-[25px]">
                                <p className="font-bold">Contact Us</p>
                                <p className="text-sm">Lorem ipsum dolor sit amet</p>
                                <p className="text-sm">+1 4387985779</p>
                                <p className="text-sm">contact@burgers.com</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="flex justify-center pt-[50px]"><img src="/logo.png" alt="Logo" className="h-[75px]" /></div>
        </header>
    )
}