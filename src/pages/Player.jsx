import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Player({ players }){

    const { id } = useParams()
    const player = players.find(item => {
        return item.short_name === id
    })
    console.log(player)

    return (
        <div className="h-96 w-full text-3xl flex justify-center items-center text-red-600 bg-slate-600">
            {player ? player.short_name : <RouteError />}
        </div>
    )
}