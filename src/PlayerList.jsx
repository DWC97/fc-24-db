import { Link } from "react-router-dom"
import data from "./final.json"
import { useState } from "react";

export function PlayerList(){

    const list = data.results
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(40);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = list.slice(indexOfFirstRecord, 
        indexOfLastRecord);
    
    console.log(currentRecords)

    return (
        <div className="player-list">
            {currentRecords.map(item => {
                return (
                <div key={item.player_id}>
                    <Link to={`/player/${item.short_name}`}>
                        {`${item.short_name} - ${item.overall}`}
                    </Link>   
                </div>)
            })}
        </div>
    )
}