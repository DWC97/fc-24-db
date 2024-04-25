// hooks
import { usePlayers } from "../context/PlayersContext"

// components
import { Table } from "../components/table/Table"


export function PlayerSearch() {

    const players = usePlayers() // import player list

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">FC 24 PLAYERS</h1>
                <p className="text-custom-grey">Ratings & statistics for male players in Europe&apos;s top five leagues. </p>
            </div>
            {/* pass players to table component as prop */}
            <Table players={players} />
        </div>
    )
}