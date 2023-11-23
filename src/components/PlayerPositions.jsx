import { useState } from "react"
import data from "../final.json"

export function PlayerPositions({ setCurrentPage, setList, setFilterCount, list }){

    
    

    function filterByPosition(position){
        setPositions(prev => {
            return prev.map(p => {
                if (p === position){
                    return {...p, checked: !p.checked}
                }
                else {
                    return {...p, checked: false}
                }
            })
        })

        setCurrentPage(1)
        
        // if (position.position === "ALL"){
        //     setList(data.results)
        // }
        // else {
        //     setList(data.results.filter(player => player.player_positions.includes(position.position)))
        // }
        
        setFilterCount(prev => prev + 1)
    }

    return (
        <div>
            {positions.map(p => {
                return (
                        <label 
                        key={p.position}>
                            <input 
                            type="checkbox" 
                            checked={p.checked}
                            onChange={() => filterByPosition(p)}/>
                            {p.position}
                        </label>
                        )
            })}
        </div>
    )
}