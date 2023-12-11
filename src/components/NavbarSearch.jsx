import { Link } from "react-router-dom"

export function NavbarSearch({ short_name, overall }){

    function onSearch(player){
        setValue(player)
    }

    return (
        <Link to={`/player/${short_name}`}>
            <div onClick={() => {
            onSearch(short_name)
            }} className={`flex flex-row relative bg-gray-50 items-center w-72 justify-between py-1 border-b border-gray-300 text-custom-maroon hover:bg-custom-maroon hover:text-white hover:border-custom-maroon md:w-96`}>
                <div className="pl-4 flex flex-row items-center justify-center">
                    <img src={`https://cdn.sofifa.net/players/231/747/24_120.png`} className="w-7"/>
                    <img src={`https://cdn.sofifa.net/meta/team/9/120.png`} className="w-5 h-5 ml-2 mr-3 md:ml-6 md:mr-8"/>
                    <img src={`https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png`} className="w-6 h-4"/>
                </div>
                <span className="text-xs font-medium absolute ml-36 md:ml-48">{short_name}</span>
                <span className="pr-4 font-semibold ">{overall}</span>
            </div>
        </Link>
    )
}