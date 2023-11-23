import { Link } from "react-router-dom"
import data from "./final.json"
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerStats } from "./components/PlayerStats";
import { PlayerPositions } from "./components/PlayerPositions";

export function PlayerList(){

    const playerStats = [
        {
            "name": "overall",
            "abbreviation": "OVE",
            "clicked": true,
            "flipped": false
        },
        {
            "name": "pace",
            "abbreviation": "PAC",
            "clicked": false,
            "flipped": true
        },
        {
            "name": "shooting",
            "abbreviation": "SHO",
            "clicked": false,
            "flipped": true
        },
        {
            "name": "passing",
            "abbreviation": "PAS",
            "clicked": false,
            "flipped": true
        },
        {
            "name": "dribbling",
            "abbreviation": "DRI",
            "clicked": false,
            "flipped": true
        },
        {
            "name": "defending",
            "abbreviation": "DEF",
            "clicked": false,
            "flipped": true
        },
        {
            "name": "physic",
            "abbreviation": "PHY",
            "clicked": false,
            "flipped": true
        }
    ]

    const [list, setList] = useState(data.results.filter(player => player.player_positions !== "GK"))
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(40);
    const [playerList, setPlayerList] = useState([])
    const [filterCount, setFilterCount] = useState(0)
    const [stats, setStats] = useState(playerStats)

    useEffect(() => {
        const clickedStat = stats.find(stat => stat.clicked === true)

        if (clickedStat.flipped === false){
            setPlayerList(list.sort((a, b) => (a[clickedStat.name] < b[clickedStat.name]) ? 1 : -1))
        }
        else {
            setPlayerList(list.sort((a, b) => (a[clickedStat.name] > b[clickedStat.name]) ? 1 : -1))
        }

        
        
    }, [filterCount])

    useEffect(() => {

        const indexOfLastRecord = currentPage * recordsPerPage;
        setPlayerList(list.slice(0,indexOfLastRecord))

    }, [currentPage, filterCount])
    
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
                <div className="stats">
                    <PlayerStats 
                        setCurrentPage={setCurrentPage} 
                        setList={setList}
                        filterCount={filterCount}
                        setFilterCount={setFilterCount}
                        stats={stats}
                        setStats={setStats}
                    />
                </div>
                <div className="positions">
                    <PlayerPositions 
                        setCurrentPage={setCurrentPage}
                        setList={setList}
                        setFilterCount={setFilterCount}
                    />
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