import { useState } from "react"

export function PlayerPositions(){

    const playerPositions = [
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
    const [positions, setPositions] = useState(playerPositions)

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