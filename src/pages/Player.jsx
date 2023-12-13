import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";
import { formatNumber } from "../utils/Utils";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    console.log(player)
    const playerDesc = {
        "Full Name": player.long_name,
        "Age": player.age,
        "Height (cm)": player.height_cm,
        "Positions": player.player_positions,
        "Preferred Foot": player.preferred_foot,
        "Weak Foot": `${player.weak_foot}*`,
        "Skill Moves": `${player.skill_moves}*`,
        "Work Rate": player.work_rate,
        "League": player.league_name,
        "Estimated Market Value": `€${formatNumber(player.value_eur)}`,
        "Wages (Weekly)": `€${formatNumber(player.wage_eur)}`
    }

    const chartData = [
        { name: "PACE", x: player.pace },
        { name: "SHOOTING", x: player.shooting },
        { name: "PASSING", x: player.passing },
        { name: "DRIBBLING", x: player.dribbling },
        { name: "DEFENDING", x: player.defending },
        { name: "PHYSIC", x: player.physic },
    ]

    return (
        <div className="flex flex-col w-full px-5 md:px-10 lg:px-20">
           <div className="flex flex-row mt-24 relative justify-between items-center text-custom-maroon">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                    <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-24 md:w-32"/>
                </div>
                <div className="absolute flex flex-col justify-around h-full ml-28 md:ml-40 py-4">
                    <span className="hidden md:flex md:text-3xl font-medium tracking-widest">{player.short_name}</span>
                    <span className="text-xl flex md:hidden">{player.short_name}  <span className="font-semibold ml-3">{player.overall}</span></span>
                    <div className="flex flex-row justify-between items-center text-xs md:text-base">
                        <div className="flex flex-row items-center">
                            <span>{player.club_name.toUpperCase()}</span>
                            <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-4 ml-1 md:w-7 md:ml-3"/>
                        </div>
                        <div className="flex flex-row ml-2 md:ml-8 items-center">
                            <span>{player.nationality_name.toUpperCase()}</span>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png" className="w-4 ml-1 md:w-7 md:ml-3"/>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-row justify-center items-center">
                    <span className="text-lg mr-2 md:text-2xl md:mr-6">{player.club_position}</span>
                    <span className="text-4xl md:text-6xl font-semibold">{player.overall}</span>
                </div>
           </div>

           <div className="flex flex-wrap">
                <div className="w-full md:w-2/4">
                    <ul className="w-full ">
                        {Object.entries(playerDesc).map(([key, val], i) => (
                            <li key={i} className="w-full flex flex-row justify-between odd:bg-gray-100 even:bg-white px-2 py-1 text-xs md:text-sm lg:text-base">
                                <span className="text-gray-700">{key}</span>
                                <span className="text-custom-grey font-medium">{val}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-2/4 h-96">
                    <RadarChart height={500} width={500} 
                    outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar dataKey="x" stroke="green"
                        fill="green" fillOpacity={0.5} />
                    </RadarChart>
                </div>
           </div>
        </div>
    )
}