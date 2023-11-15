import { useParams } from "react-router-dom"

export function PlayerPage(){

    const { id } = useParams()

    return (
        <div>
            {id}
        </div>
    )
}