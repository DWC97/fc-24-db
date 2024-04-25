// hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayers } from "../context/PlayersContext"

// components
import { NotFound } from "./NotFound"

// routing
import { Link } from "react-router-dom"

// data 
import leagueData from "../data/leagues.json"
import nationsData from "../data/nations.json"

// utilities
import { formatNumber, splitId } from "../utilities/Utils"

// assets
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


export function PlayerDetails() {

    const players = usePlayers() // import player list
    const { id } = useParams() // access search param (eg. Martin Ødegaard)
    // find the player in players data based off search param
    const player = players.find(item => {
        return item.long_name === id
    })
    const league = (player ? leagueData.leagues.find(league => player.league_name === league.name) : null) // find league in leagues data if player exists
    const club = (player ? league.clubs.find(club => club.name === player.club_name) : null) // find club in leagues data if player exists
    const nation = (player ? nationsData.find(nation => nation.name === player.nationality_name) : null) // find nations in nations data if player exists
    const imageUrl = (player ? `https://cdn.sofifa.net/players/${splitId(player.player_id)}/24_120.png` : null) // player image scraped from sofifa's online database if player exists
    const [playerImage, setPlayerImage] = useState("https://cdn.sofifa.net/player_0.svg") // placeholder image
    // pbject with player description
    const playerDesc = (player ? {
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
    } : [])
    // player attributes formatted to match radar chart data specs
    const chartData = (player ? [
        { name: "PAC", x: player.pace },
        { name: "SHO", x: player.shooting },
        { name: "PAS", x: player.passing },
        { name: "DRI", x: player.dribbling },
        { name: "DEF", x: player.defending },
        { name: "PHY", x: player.physic },
    ] : [])
    // player attributes
    const attributeData = (player ? [
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
    ] : [])

    useEffect(() => {

        if (player) {
            fetch(`/proxy?url=${encodeURIComponent(imageUrl)}`)
                .then(async () => {
                    // if fetch attempt is successful, set the player image as the valid url
                    setPlayerImage(imageUrl)
                })
                .catch((error) => {
                    console.error("Error fetching image:", error)
                })
        }

    }, [id])

    // function to take in value for attribute and return associated color code in tailwind accepted format
    function colorGenerator(value, number) {
        if (number < 1) {
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
        <div>
            {player ?
                <div className="flex flex-col w-full px-5 md:px-10 lg:px-20 xl:px-32 2xl:px-60">
                    {/* header content */}
                    <div className="flex flex-row mt-24 relative justify-between items-center">
                        <div className="bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                            <img src={playerImage} className="w-24 md:w-32"
                                // revert to placeholder if error displying image
                                onError={() => setPlayerImage("https://cdn.sofifa.net/player_0.svg")} />
                        </div>
                        <div className="absolute flex flex-col justify-around h-full ml-28 md:ml-40 py-4">
                            <span className="hidden md:flex md:text-3xl font-medium tracking-widest text-custom-maroon">{player.short_name}</span>
                            <span className="text-xl flex md:hidden text-custom-maroon">{player.short_name}  <span className="font-semibold ml-3">{player.overall}</span></span>
                            <div className="flex flex-row justify-between items-center text-xs md:text-base">
                                <div className="flex flex-row items-center hover:text-custom-maroon ease-in-out duration-300">
                                    <Link to={`/clubs/${player.club_name}`} ><span>{player.club_name.toUpperCase()}</span></Link>
                                    <Link to={`/clubs/${player.club_name}`} tabIndex={-1}><img src={club.url} className="w-4 ml-1 md:w-7 md:ml-3" /></Link>
                                </div>
                                <div className="flex flex-row ml-2 md:ml-8 items-center hover:text-custom-maroon ease-in-out duration-300">
                                    <Link to={`/nations/${player.nationality_name}`}><span>{player.nationality_name.toUpperCase()}</span></Link>
                                    <Link to={`/nations/${player.nationality_name}`} tabIndex={-1}><img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-4 ml-1 md:w-7 md:ml-3" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-row justify-center items-center text-custom-maroon">
                            <span className="text-lg mr-2 md:text-2xl md:mr-6">{player.player_positions.split(",")[0]}</span>
                            <span className="text-4xl md:text-6xl font-semibold">{player.overall}</span>
                        </div>
                    </div>

                    {/* middle content */}
                    <div className="flex flex-wrap justify-between items-center mt-4 md:-mt-8">
                        {/* player description table */}
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
                        {/* radar chart */}
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

                    {/* progress bars and attribute values */}
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
                                                <li className="w-full flex flex-row justify-between px-4 md:text-sm text-xs py-1 lg:py-2" key={index}>
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
                :
                <NotFound /> // if the search param doesn't match a valid player in the dataset, return the 404 page
            }
        </div>
    )
}