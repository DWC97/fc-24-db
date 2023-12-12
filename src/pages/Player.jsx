import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    console.log(player)

    return (
        <div className="flex flex-col w-full px-20">
           <div className="flex flex-row mt-36 relative justify-between items-center text-custom-maroon">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-32"/>
                </div>
                <div className="absolute flex flex-col justify-around h-full ml-40 py-4">
                    <span className="text-3xl font-medium tracking-widest">{player.short_name}</span>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center">
                            <span>{player.club_name.toUpperCase()}</span>
                            <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-7 ml-3"/>
                        </div>
                        <div className="flex flex-row ml-8 items-center">
                            <span>{player.nationality_name.toUpperCase()}</span>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" className="w-7 ml-3"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <span className="text-2xl mr-6">{player.club_position}</span>
                    <span className="text-6xl font-semibold">{player.overall}</span>
                </div>
           </div>
        </div>
    )
}