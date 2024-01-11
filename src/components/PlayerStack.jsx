import { Link } from "react-router-dom"
// import playersData from "../data/final.json"
import playersData from "../data/players.json"
import leagueData from "../data/leagues.json"
import nationsData from "../data/nations.json"

export function PlayerStack({ short_name, overall, player_positions, pace, shooting, passing, dribbling, defending, physic }){

    // const player = playersData.results.find(player => player.short_name === short_name)
    const player = playersData.find(player => player.short_name === short_name)

    const league = leagueData.leagues.find(league => player.league_name === league.name)
    const club = league.clubs.find(club => club.name === player.club_name)
    const nation = nationsData.find(nation => nation.name === player.nationality_name)


    return (
        <div className="flex justify-end relative h-10 py-6 items-center border-b border-gray-300">
            <img src="https://cdn.sofifa.net/players/231/747/24_120.png" className="w-8 absolute left-0"/>
            <span className="absolute text-xs md:text-sm lg:text-base left-8 md:left-12 text-black tracking-wider "><Link to={`/players/${short_name}`}>{short_name}</Link></span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/nations/${player.nationality_name}`}><img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-6"/></Link>       
            </div>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center">
                <Link to={`/clubs/${player.club_name}`}><img src={club ? club.url : "https://cdn.sofifa.net/meta/team/9/120.png"} className="w-6"/></Link>
            </div>
            <span className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium ml-3 mr-3 lg:mr-0">{player_positions.split(",")[0]}</span>
            <div className="w-16 md:w-12 lg:w-16 flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{overall}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{pace}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{shooting}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{passing}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{dribbling}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center font-medium">
                <span className="bg-gray-300 py-1 px-2">{defending}</span>
            </div>
            <div className="w-16 md:w-12 lg:w-16 hidden md:flex justify-center  font-medium">
                <span className="bg-gray-300 py-1 px-2">{physic}</span>
            </div>
        </div>
    )
}