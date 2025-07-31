import { MdOutlineShoppingCart } from "react-icons/md"

export default function Header(props) {
    return (
        <header className="pt-[10px]">
            <div className="flex justify-between">
                <select name="languages" id="languages" className="cursor-pointer" onChange={(e) => props.setSelectedLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Turkish">Türkçe</option>
                </select>
                <MdOutlineShoppingCart className="cursor-pointer" onClick={props.showBasket} />
            </div>
            <h3 className="text-xl font-bold text-center">Burger House</h3>
        </header>
    ) 
}