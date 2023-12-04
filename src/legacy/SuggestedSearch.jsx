import { useState } from "react"
import data from "../data/final.json"
import { Link } from "react-router-dom"

export function SuggestedSearch(){

    const [value, setValue] = useState("")
    const list = data.results

    function onSearch(player){
        setValue(player)
    }

    return (
        <div className="search">
            <h1>Search</h1>
            <br/>
            <br/>
            <input type="text" value={value} onChange={(e) => {
                setValue(e.target.value)
            }}/>
            {list.filter(item => {
                return value && item.long_name.toLowerCase().includes(value.toLowerCase()) && value.toLowerCase() !== item.long_name.toLowerCase()
            }).slice(0,10)
            .map(item => {
                return <div key={item.player_id} onClick={() => {
                    onSearch(item.short_name)
                }}><Link to={`/player/${item.short_name}`}>{`${item.short_name} - ${item.overall}`}</Link></div>
            })}
        </div>
    )
}