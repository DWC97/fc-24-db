import { Link } from "react-router-dom"

export function NavbarSearch({ short_name, overall, setValue }){

    // function onSearch(player){
    //     setValue(player)
    // }

    return (
        <Link to={`/player/${short_name}`}>
            <div 
            onClick={() => {
            setValue("")
            }} 
            className={`hidden md:flex md:flex-row relative bg-custom-black items-center w-48 md:justify-between py-1 border-b border-custom-grey text-white hover:bg-custom-maroon hover:text-white hover:border-custom-maroon`}>
                <span className="text-xs font-medium pl-4">{short_name}</span>
                <span className="font-semibold pr-6">{overall}</span>
            </div>
        </Link>
    )
}