// hooks 
import { useEffect, useState } from "react"

// routing 
import { Link } from "react-router-dom"

// data
import playersData from "../../data/players.json"
import leagueData from "../../data/leagues.json"
import nationsData from "../../data/nations.json"

// utilities
import { splitId } from "../../utilities/Utils"


export function HomeSearch({ long_name }) {

    const player = playersData.find(player => player.long_name === long_name) // find the player using their long_name propery value
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
        <Link to={`/players/${player.long_name}`}>
            <div className={`flex flex-row relative bg-gray-50 items-center w-72 justify-between py-1 border-b border-gray-300 text-custom-maroon hover:bg-custom-maroon hover:text-white hover:border-custom-maroon md:w-96`}>
                <div className="pl-4 flex flex-row items-center justify-center">
                    <img src={playerImage} alt="player headshot" className="w-7"
                        // revert to placeholder if error displying image
                        onError={() => setPlayerImage("https://cdn.sofifa.net/player_0.svg")} />
                    <img src={club.url} alt="club logo" className="h-5 ml-2 mr-3 md:ml-6 md:mr-8" />
                    <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} alt="nation flag" className="w-6" />
                </div>
                <span className="text-xs font-medium absolute ml-36 md:ml-48 tracking-wider">{player.short_name}</span>
                <span className="pr-4 font-semibold ">{player.overall}</span>
            </div>
        </Link>

    )
}