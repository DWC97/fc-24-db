import { Link } from "react-router-dom"
import playersData from "../data/players.json"
import leagueData from "../data/leagues.json"
import nationsData from "../data/nations.json"

export function PlayerSearch({ short_name, overall, player_id, club_team_id, nation_team_id}){

    const player = playersData.find(player => player.short_name === short_name)
    const league = leagueData.leagues.find(league => player.league_name === league.name)
    const club = league.clubs.find(club => club.name === player.club_name)
    const nation = nationsData.find(nation => nation.name === player.nationality_name)

    function splitId(id){
        const firstId = id.toString().slice(0, 3)
        const secondId = id.toString().slice(3, 6)
        return `${firstId}/${secondId}`
    }

    return (
        <Link to={`/players/${short_name}`}>
            <div className={`flex flex-row relative bg-gray-50 items-center w-72 justify-between py-1 border-b border-gray-300 text-custom-maroon hover:bg-custom-maroon hover:text-white hover:border-custom-maroon md:w-96`}>
                <div className="pl-4 flex flex-row items-center justify-center">
                    <img src={`https://cdn.sofifa.net/players/${splitId(player.player_id)}/24_120.png`} className="w-7"/>
                    <img src={club.url} className="w-5 h-5 ml-2 mr-3 md:ml-6 md:mr-8"/>
                    <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-6"/>
                </div>
                <span className="text-xs font-medium absolute ml-36 md:ml-48 tracking-wider">{short_name}</span>
                <span className="pr-4 font-semibold ">{overall}</span>
            </div>
        </Link>
        
    )
}