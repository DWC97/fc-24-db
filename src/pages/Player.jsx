import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    console.log(player)

    return (
        <div className="flex flex-col w-full px-16">
           <div className="flex flex-row mt-36 relative justify-between items-center">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-32"/>
                </div>
                <div className="absolute flex flex-col">
                    <span>{player.short_name}</span>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row">
                            <span>{player.club_name}</span>
                            <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-7"/>
                        </div>
                        <div className="flex flex-row">
                            <span>{player.nationality_name}</span>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" className="w-7"/>
                        </div>
                    </div>
                </div>
                <div>
                    <span>{player.club_position}</span>
                    <span>{player.overall}</span>
                </div>
           </div>
        </div>
    )
}