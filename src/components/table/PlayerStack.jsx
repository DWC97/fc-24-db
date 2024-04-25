// hooks
import { useEffect, useState } from "react"

// routing 
import { Link } from "react-router-dom"

// data
import leagueData from "../../data/leagues.json"
import nationsData from "../../data/nations.json"

// utilities
import { splitId } from "../../utilities/Utils"


// player stack in filtered table
export function PlayerStack({ ...player }) {

    const league = leagueData.leagues.find(league => player.league_name === league.name) // find league using player data
    const club = league.clubs.find(club => club.name === player.club_name) // find club using player data
    const nation = nationsData.find(nation => nation.name === player.nationality_name) // find nation using player data
    const imageUrl = `https://cdn.sofifa.net/players/${splitId(player.player_id)}/24_120.png` // player image scraped from sofifa's online database
    const [playerImage, setPlayerImage] = useState("https://cdn.sofifa.net/player_0.svg") // placeholder image

    useEffect(() => {

        fetch(`/proxy?url=${encodeURIComponent(imageUrl)}`)
            .then(async () => {
                // if fetch attempt is successful, set the player image as the valid url
                setPlayerImage(imageUrl)
            })
            .catch((error) => {
                console.error("Error fetching image:", error)
            })

    }, [])

    return (
        <div className="flex justify-end relative h-10 py-6 items-center border-b border-gray-300">
            <img src={playerImage} className="w-8 absolute left-0"
                // revert to placeholder if error displying image
                onError={() => setPlayerImage("https://cdn.sofifa.net/player_0.svg")}
            />
            <span className="absolute text-xs md:text-sm lg:text-base left-10 md:left-12 text-black tracking-wider hover:opacity-80 ease-in-out duration-300 cursor-pointer"><Link to={`/players/${player.long_name}`}>{player.short_name}</Link></span>
            <div className="w-12 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/nations/${player.nationality_name}`}><img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-6" /></Link>
            </div>
            <div className="w-12 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/clubs/${player.club_name}`}><img src={club ? club.url : "https://cdn.sofifa.net/meta/team/9/120.png"} className="h-6" /></Link>
            </div>
            <span className="w-12 md:w-12 lg:w-16 hidden md:flex justify-center font-medium ml-3 mr-3 lg:mr-0">{player.player_positions.split(",")[0]}</span>
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