import { useParams } from "react-router-dom"
import data from "./final.json"

export function PlayerPage(){

    const { id } = useParams()
    const list = data.results
    const isPlayer = list.find(item => {
        return item.short_name === id
    })

    return (
        <div>
            {isPlayer ? <div>{id}</div> : <div>404</div>}
        </div> 
    )
}