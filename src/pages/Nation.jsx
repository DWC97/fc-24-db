import { Table } from "../components/Table";
import { useParams } from "react-router-dom"
import nationsData from "../data/nations.json"
import { usePlayers } from "../context/PlayersContext";

export function Nation(){

    const players = usePlayers()
    const { id } = useParams()
    const nationPlayers = players.filter(player => player.nationality_name === id)
    const nation = nationsData.find(nation => nation.name === id)

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-row items-center mt-32 bg-custom-grey h-16 md:h-24">
                <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-10 md:w-16 mx-4 md:mx-8"/>
                <h1 className="text-white text-sm md:text-3xl font-medium tracking-widest">{id.toUpperCase()}</h1>
            </div>
            <Table players={nationPlayers}/>
        </div>
    )
}