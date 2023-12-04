import { useParams } from "react-router-dom"
import data from "../data/final.json"

export function PlayerPage(){

    const { id } = useParams()
    const list = data.results
    const player = list.find(item => {
        return item.short_name === id
    })

    return (
        <div>
            {player ? <div>{player.short_name}</div> : <div>404</div>}
        </div> 
    )
}