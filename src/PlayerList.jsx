import { Link } from "react-router-dom"
import data from "./final.json"
import { useCallback, useRef, useState } from "react";

export function PlayerList(){

    const list = data.results

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(40);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentRecords = list.slice(indexOfFirstRecord,indexOfLastRecord);
    
    const observer = useRef()
    const lastPlayerElementRef = useCallback(node => {
        console.log(node)
    })

    return (
        <div className="player-list">
            {currentRecords.map((item, index) => {
                if (currentRecords.length === index + 1){
                    return (
                        <div key={item.player_id} ref={lastPlayerElementRef}>
                            <Link to={`/player/${item.short_name}`}>
                            {`${item.short_name} - ${item.overall}`}
                            </Link>   
                        </div>)
                    
                }
                else {
                    return (
                        <div key={item.player_id}>
                            <Link to={`/player/${item.short_name}`}>
                                {`${item.short_name} - ${item.overall}`}
                            </Link>   
                        </div>)
                }
                
            })}
        </div>
    )
}