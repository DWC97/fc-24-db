import { Table } from "../components/table/Table"
import { useParams } from "react-router-dom"
import leagueData from "../data/leagues.json"
import { usePlayers } from "../context/PlayersContext"

export function Club(){

    const players = usePlayers()
    const { id } = useParams()
    const clubPlayers = players.filter(player => player.club_name === id)
    const league = leagueData.leagues.find(league => {
        return league.clubs.find(club => club.name === id)
    })
    const club = league.clubs.find(club => club.name === id)

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-row items-center mt-32 h-16 md:h-24 bg-custom-grey">
                <img src={club.url} className="h-12 md:h-16 mx-4 md:mx-8"/>
                <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">CLUB - {id.toUpperCase()}</h1>
            </div>
            <Table players={clubPlayers}/>
        </div>
    )
}