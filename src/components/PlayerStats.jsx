import { useState } from "react"

export function PlayerStats({ setCurrentPage, setList, setFilterCount }){

    const playerStats = [
        {
            "name": "overall",
            "abbreviation": "OVE",
            "clicked": false,
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

    const [stats, setStats] = useState(playerStats)
    
    function sortByStat(stat){
        
        setStats((prev) => {
            return prev.map(s => {
                if (s === stat){
                    return {...s, clicked: true, flipped: !s.flipped}
                }
                else {
                    return {...s, clicked: false, flipped: true}
                }
            })
        })
  
        setCurrentPage(1)
        setList(prev => {
            if (stat.flipped === true){
                return prev.sort((a, b) => (a[stat.name] < b[stat.name]) ? 1 : -1)
            }
            else {
                return prev.sort((a, b) => (a[stat.name] > b[stat.name]) ? 1 : -1)
            }
            
        })
        setFilterCount(prev => prev + 1)
    }

    return (
        <div>
            {stats.map(stat => {
                return (
                    <div 
                    style={{ color: stat.clicked? 'red' : "black" }}
                    key={stat.abbreviation} 
                    className={stat.name}
                    onClick={() => sortByStat(stat)}>
                        {stat.abbreviation}
                    </div>
                )
            })}
        </div>
    )
}