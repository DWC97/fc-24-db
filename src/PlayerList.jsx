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

    const playerPositions = [
        {
            "position": "ALL",
            "checked": true
        },
        {
            "position": "ST",
            "checked": false
        },
        {
            "position": "CF",
            "checked": false
        },
        {
            "position": "LW",
            "checked": false
        },
        {
            "position": "LM",
            "checked": false
        },
        {
            "position": "RW",
            "checked": false
        },
        {
            "position": "RM",
            "checked": false
        },
        {
            "position": "CAM",
            "checked": false
        },
        {
            "position": "CM",
            "checked": false
        },
        {
            "position": "CDM",
            "checked": false
        },
        {
            "position": "LWB",
            "checked": false
        },
        {
            "position": "LB",
            "checked": false
        },
        {
            "position": "RWB",
            "checked": false
        },
        {
            "position": "RB",
            "checked": false
        },
        {
            "position": "CB",
            "checked": false
        }
    ]

    const list = data.results.filter(player => player.player_positions !== "GK")
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(40);
    const [playerList, setPlayerList] = useState(list.slice(0, 40))
    const [renderedList, setRenderedList] = useState([])
    const [filterCount, setFilterCount] = useState(0)
    const [stats, setStats] = useState(playerStats)
    const [positions, setPositions] = useState(playerPositions)

    useEffect(() => {
        setRenderedList(playerList)
    }, [])

    useEffect(() => {
        const clickedStat = stats.find(stat => stat.clicked === true)
        const clickedPosition = positions.find(position => position.checked === true)
 


            if (clickedStat.flipped === false){

                setPlayerList(list.sort((a, b) => (a[clickedStat.name] < b[clickedStat.name]) ? 1 : -1))
                setRenderedList(playerList)
            }
            else {
       
                setPlayerList(list.sort((a, b) => (a[clickedStat.name] > b[clickedStat.name]) ? 1 : -1))
                setRenderedList(playerList)
            }
           
        // else {
        //     if (clickedStat.flipped === false){
          
        //         setPlayerList(list.sort((a, b) => (a[clickedStat.name] < b[clickedStat.name]) ? 1 : -1))
        //     }
        //     else {
         
        //         setPlayerList(list.sort((a, b) => (a[clickedStat.name] > b[clickedStat.name]) ? 1 : -1))
        //     }
        // }
        
        
    }, [filterCount])

    useEffect(() => {

        const indexOfLastRecord = currentPage * recordsPerPage;
        // setPlayerList(list.slice(0,indexOfLastRecord))
        setRenderedList(playerList.slice(0, indexOfLastRecord))
        console.log(playerList)
        

    }, [currentPage, filterCount])
    
    const observer = useRef()
    const lastPlayerElementRef = useCallback(node => {
  
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                console.log("observed")
                setCurrentPage(prevNumber => prevNumber + 1)
                console.log(currentPage)
            }
        })

        if (node) observer.current.observe(node)
    }, [])

    return (
        <div className="player-list">
            <div className="filters">
                <div className="stats">
                    <PlayerStats 
                        setFilterCount={setFilterCount}
                        stats={stats}
                        setStats={setStats}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <div className="positions">
                    <PlayerPositions 
                        positions={positions}
                        setPositions={setPositions}
                        setCurrentPage={setCurrentPage}
                        setFilterCount={setFilterCount}
                    />
                </div>
            </div>
            {renderedList.map((item, index) => {
                if (renderedList.length === index + 1){
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