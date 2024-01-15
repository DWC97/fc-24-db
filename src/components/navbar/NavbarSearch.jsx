import { Link } from "react-router-dom"

export function NavbarSearch({ short_name, long_name, overall, setValue }){
   
    return (
        <Link to={`/players/${long_name}`}>
            <div 
            onClick={() => {
            setValue("")
            }} 
            className={`hidden md:flex md:flex-row relative bg-custom-black items-center w-48 md:justify-between py-1 border-b border-custom-grey text-white hover:bg-custom-maroon hover:text-white hover:border-custom-maroon opacity-95`}>
                <span className="text-xs font-normal pl-4">{short_name}</span>
                <span className="font-semibold pr-6">{overall}</span>
            </div>
        </Link>
    )
}