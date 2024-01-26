// hooks
import { usePlayers } from "../context/PlayersContext"
import { useParams } from "react-router-dom"

// components
import { Table } from "../components/table/Table"
import { NotFound } from "./NotFound"

// data
import leagueData from "../data/leagues.json"


export function Club(){

    const players = usePlayers() // import player list
    const { id } = useParams() // access search param (eg. Arsenal)
    // find league in leagues data using search param 
    const league = leagueData.leagues.find(league => {
        return league.clubs.find(club => club.name === id)
    }) 
    const club = (league ? league.clubs.find(club => club.name === id) : null) // find club in leagues data using search param
    const clubPlayers = (league ? players.filter(player => player.club_name === id) : null) // find club players in players data using search param
    
    return (
        <div>
            {league ?
            <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
                <div className="flex flex-row items-center mt-32 h-16 md:h-24 bg-custom-grey">
                    <img src={club.url} className="h-12 md:h-16 mx-4 md:mx-8"/>
                    <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">CLUB - {id.toUpperCase()}</h1>
                </div>
                {/* pass club players to table component as prop */}
                <Table players={clubPlayers}/>
            </div>
            :
            <NotFound /> // if the search param doesn't match a valid club in the dataset, return the 404 page
            }
        </div>
    )
}