import { Link } from "react-router-dom"
import data from "./final.json"
import { useCallback, useEffect, useRef, useState } from "react";

export function PlayerList(){

    const list = data.results

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(40);
    const [playerList, setPlayerList] = useState([])
    // const [hasMore, setHasMore] = useState(true)

    
    useEffect(() => {

        const indexOfLastRecord = currentPage * recordsPerPage;
        setPlayerList(list.slice(0,indexOfLastRecord))

    }, [currentPage])
    
    const observer = useRef()
    const lastPlayerElementRef = useCallback(node => {
  
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                setCurrentPage(prevNumber => prevNumber + 1)
            }
        })

        if (node) observer.current.observe(node)
    }, [])

    return (
        <div className="player-list">
            <div className="filters">
                <div className="position">
                    Position
                </div>
            </div>
            {playerList.map((item, index) => {
                if (playerList.length === index + 1){
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