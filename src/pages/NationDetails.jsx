// hooks 
import { usePlayers } from "../context/PlayersContext"
import { useParams } from "react-router-dom"

// components
import { Table } from "../components/table/Table"
import { NotFound } from "./NotFound"

// data
import nationsData from "../data/nations.json"


export function NationDetails(){

    const players = usePlayers() // import player list
    const { id } = useParams() // access search param (eg. Republic of Ireland)
    const nation = nationsData.find(nation => nation.name === id) // find nation in nations data using search param
    const nationPlayers = (nation ? players.filter(player => player.nationality_name === id) : null) // find nation players in players data using search param

    return (
        <div>
            {nation ?
            <div className="w-full flex flex-col px-5 md:px-10 lg:px-20 xl:px-32 2xl:px-60">
                <div className="flex flex-row items-center mt-32 bg-custom-grey h-16 md:h-24">
                    <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-10 md:w-16 mx-4 md:mx-8"/>
                    <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">{id.toUpperCase()}</h1>
                </div>
                {/* pass nation players to table component as prop */}
                <Table players={nationPlayers}/>
            </div>
            :
            <NotFound /> // if the search param doesn't match a valid club in the dataset, return the 404 page
            }
        </div>
    )
}