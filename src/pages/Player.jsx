import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    console.log(player)

    return (
        <div className="flex flex-col w-full">
           <div className="flex flex-row mt-20">
                Henlo
           </div>
        </div>
    )
}