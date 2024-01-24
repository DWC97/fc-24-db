import { Table } from "../components/table/Table"
import { usePlayers } from "../context/PlayersContext"

export function PlayerSearch(){

    const players = usePlayers()

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">FC 24 PLAYERS</h1>
                <p className="text-custom-grey">Ratings & statistics for male players in Europe’s top five leagues. </p>
            </div>
            <Table players={players}/>
        </div>
    )
}