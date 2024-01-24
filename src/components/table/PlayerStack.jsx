import { Link } from "react-router-dom"
import playersData from "../../data/players.json"
import leagueData from "../../data/leagues.json"
import nationsData from "../../data/nations.json"
import { splitId } from "../../utilities/Utils"
import { useEffect, useState } from "react"

export function PlayerStack({ long_name }){

    const player = playersData.find(player => player.long_name === long_name)
    const league = leagueData.leagues.find(league => player.league_name === league.name)
    const club = league.clubs.find(club => club.name === player.club_name)
    const nation = nationsData.find(nation => nation.name === player.nationality_name)
    const imageUrl = `https://cdn.sofifa.net/players/${splitId(player.player_id)}/24_120.png`
    const [playerImage, setPlayerImage] = useState("https://cdn.sofifa.net/player_0.svg")

    useEffect(() => {

        fetch(`/proxy?url=${encodeURIComponent(imageUrl)}`)
        .then(async () => {
            setPlayerImage(imageUrl)
        })
        .catch((error) => {
            console.error("Error fetching image:", error)
        })

    }, [])

    return (
        <div className="flex justify-end relative h-10 py-6 items-center border-b border-gray-300">
            <img src={playerImage} className="w-8 absolute left-0" onError={() => setPlayerImage("https://cdn.sofifa.net/player_0.svg")}/>
            <span className="absolute text-xs md:text-sm lg:text-base left-8 md:left-12 text-black tracking-wider "><Link to={`/players/${player.long_name}`}>{player.short_name}</Link></span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/nations/${player.nationality_name}`}><img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-6"/></Link>       
            </div>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/clubs/${player.club_name}`}><img src={club ? club.url : "https://cdn.sofifa.net/meta/team/9/120.png"} className="h-6"/></Link>
            </div>
            <span className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium ml-3 mr-3 lg:mr-0">{player.player_positions.split(",")[0]}</span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.overall}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.pace}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.shooting}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.passing}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.dribbling}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.defending}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{player.physic}</span>
            </div>
        </div>
    )
}