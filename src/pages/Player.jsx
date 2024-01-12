import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { RouteError } from "../components/RouteError";
import { formatNumber, splitId } from "../utils/Utils";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import leagueData from "../data/leagues.json"
import nationsData from "../data/nations.json"

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    const league = leagueData.leagues.find(league => player.league_name === league.name)
    const club = league.clubs.find(club => club.name === player.club_name)
    const nation = nationsData.find(nation => nation.name === player.nationality_name)

    const playerDesc = {
        "Full Name": player.long_name,
        "Age": player.age,
        "Height (cm)": player.height_cm,
        "Position(s)": player.player_positions,
        "Preferred Foot": player.preferred_foot,
        "Weak Foot": `${player.weak_foot}*`,
        "Skill Moves": `${player.skill_moves}*`,
        "Work Rate": player.work_rate,
        "League": player.league_name,
        "Estimated Market Value": `€${formatNumber(player.value_eur)}`,
        "Wages (Weekly)": `€${formatNumber(player.wage_eur)}`
    }

    const chartData = [
        { name: "PAC", x: player.pace },
        { name: "SHO", x: player.shooting },
        { name: "PAS", x: player.passing },
        { name: "DRI", x: player.dribbling },
        { name: "DEF", x: player.defending },
        { name: "PHY", x: player.physic },
    ]

    const attributeData = [
        {
            "name": "pace",
            "value": player.pace,
            "stats": {
                "Acceleration": player.movement_acceleration,
                "Sprint Speed": player.movement_sprint_speed
            }
        },
        {
            "name": "shooting",
            "value": player.shooting,
            "stats": {
                "Positioning": player.mentality_positioning,
                "Finishing": player.attacking_finishing,
                "Shot Power": player.power_shot_power,
                "Long Shots": player.power_long_shots,
                "Volleys": player.attacking_volleys,
                "Penalties": player.mentality_penalties
            }
        },
        {
            "name": "passing",
            "value": player.passing,
            "stats": {
                "Vision": player.mentality_vision,
                "Crossing": player.attacking_crossing,
                "FK. Accuracy": player.skill_fk_accuracy,
                "Short Passing": player.attacking_short_passing,
                "Long Passing": player.skill_long_passing,
                "Curve": player.skill_curve
            }
        },
        {
            "name": "dribbling",
            "value": player.dribbling,
            "stats": {
                "Agility": player.movement_agility,
                "Balance": player.movement_balance,
                "Reactions": player.movement_reactions,
                "Ball Control": player.skill_ball_control,
                "Dribbling": player.skill_dribbling,
                "Composure": player.mentality_composure,
            }
        },
        {
            "name": "defending",
            "value": player.defending,
            "stats": {
                "Interceptions": player.mentality_interceptions,
                "Heading Acc.": player.attacking_heading_accuracy,
                "Def. Awareness": player.defending_marking_awareness,
                "Standing Tackle": player.defending_standing_tackle,
                "Sliding Tackle": player.defending_sliding_tackle,
            }
        },
        {
            "name": "physicality",
            "value": player.physic,
            "stats": {
                "Jumping": player.power_jumping,
                "Stamina": player.power_stamina,
                "Strength": player.power_strength,
                "Aggression": player.mentality_aggression,
            }
        },
    ]

    function colorGenerator(value, number){
        if (number < 1){
            if (value < 55) return '#fa5d54'
            else if (value >= 55 && value < 70) return '#f8aa3d'
            else if (value >= 70 && value < 80) return '#f3cc57'
            else if (value >= 80 && value < 90) return '#78ca68'
            else if (value >= 90) return '#44924a'
        }
        else {
            if (value < 55) return 'text-[#fa5d54]'
            else if (value >= 55 && value < 70) return 'text-[#f8aa3d]'
            else if (value >= 70 && value < 80) return 'text-[#f3cc57]'
            else if (value >= 80 && value < 90) return 'text-[#78ca68]'
            else if (value >= 90) return 'text-[#44924a]'
        }
        
    }

    return (
        <div className="flex flex-col w-full px-5 md:px-10 lg:px-20">
           <div className="flex flex-row mt-24 relative justify-between items-center text-custom-maroon">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                    <img src={`https://cdn.sofifa.net/players/${splitId(player.player_id)}/24_120.png`} className="w-24 md:w-32"/>
                </div>
                <div className="absolute flex flex-col justify-around h-full ml-28 md:ml-40 py-4">
                    <span className="hidden md:flex md:text-3xl font-medium tracking-widest">{player.short_name}</span>
                    <span className="text-xl flex md:hidden">{player.short_name}  <span className="font-semibold ml-3">{player.overall}</span></span>
                    <div className="flex flex-row justify-between items-center text-xs md:text-base">   
                        <div className="flex flex-row items-center">
                            <Link to={`/clubs/${player.club_name}`}><span>{player.club_name.toUpperCase()}</span></Link>
                            <img src={club.url} className="w-4 ml-1 md:w-7 md:ml-3"/>
                        </div>
                        <div className="flex flex-row ml-2 md:ml-8 items-center">
                            <Link to={`/nations/${player.nationality_name}`}><span>{player.nationality_name.toUpperCase()}</span></Link>
                            <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-4 ml-1 md:w-7 md:ml-3"/>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-row justify-center items-center">
                    <span className="text-lg mr-2 md:text-2xl md:mr-6">{player.player_positions.split(",")[0]}</span>
                    <span className="text-4xl md:text-6xl font-semibold">{player.overall}</span>
                </div>
           </div>

           <div className="flex flex-wrap justify-between items-center mt-4 md:-mt-8">
                <div className="w-full md:w-2/4">
                    <ul className="w-full ">
                        {Object.entries(playerDesc).map(([key, val], i) => (
                            <li key={i} className="w-full flex flex-row justify-between odd:bg-gray-100 even:bg-white px-2  text-sm lg:text-base">
                                <span className="text-gray-700">{key}</span>
                                <span className="text-custom-grey font-medium">{val}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-2/5 h-96 flex justify-center items-center">
                    <RadarChart height={350} width={350} 
                    outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar dataKey="x" stroke={colorGenerator(player.overall, 0)}
                        fill={colorGenerator(player.overall, 0)} fillOpacity={0.5} />
                    </RadarChart>
                </div>
           </div>

           <div className="flex flex-wrap justify-around w-full ">
                {attributeData.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col  items-center w-40 mb-8 sm:w-48 m-w-72">
                            <span className="font-semibold text-custom-grey mb-4">{item.name.toUpperCase()}</span>
                            <div className="w-28">
                                <CircularProgressbarWithChildren
                                    value={item.value * 100 / 100}
                                    circleRatio={0.5}
                                    strokeWidth={7}
                                    styles={{
                                    root: {
                                        transform: "rotate(0.75turn)"
                                    },
                                    path: { stroke: colorGenerator(item.value, 0), strokeLinecap: "butt" },
                                    trail: { stroke: "#e5e5e5", strokeLinecap: "butt" },
                                    trailColor: "grey",
                                    backgroundColor: "red"
                                    }}
                                >
                                    <span className={`mb-5 text-xl font-semibold 
                                    ${colorGenerator(item.value, 1)}
                                    `}>{item.value}</span>
                                </CircularProgressbarWithChildren>
                            </div>
                            
                            <ul className="-mt-8 w-full">
                                {Object.keys(item.stats).map((key, index) => {
                                    return (
                                        <li className="w-full flex flex-row justify-between px-4 md:text-sm text-xs py-2" key={index}>
                                            <span className="text-custom-grey">{key}</span> <span className={`${colorGenerator(item.stats[key], 1)} font-semibold`}>{item.stats[key]}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
           </div>
        </div>
    )
}