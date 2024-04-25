// routing 
import { Link } from "react-router-dom"


// player stack in navbar search dropdown
export function NavbarSearch({ setValue, ...player }) {

    return (
        <Link to={`/players/${player.long_name}`}>
            <div
                onClick={() => {
                    // reset search input and remove dropdown
                    setValue("")
                }}
                className={`hidden md:flex md:flex-row relative bg-custom-black items-center w-48 xl:w-64 2xl:w-80 md:justify-between py-1 border-b border-custom-grey text-white hover:bg-custom-maroon hover:text-white hover:border-custom-maroon opacity-95`}>
                <span className="text-xs font-normal pl-4">{player.short_name}</span>
                <span className="font-semibold pr-6">{player.overall}</span>
            </div>
        </Link>
    )
}