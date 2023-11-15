import { Link } from "react-router-dom"
import data from "./final.json"

export function PlayerList(){

    const list = data.results

    return (
        <div className="player-list">
            {list.map(item => {
                return (
                <div key={item.player_id}>
                    <Link to={`/player/${item.short_name}`}>
                        {`${item.short_name} - ${item.overall}`}
                    </Link>   
                </div>)
            })}
        </div>
    )
}