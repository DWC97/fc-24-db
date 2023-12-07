import { Link } from "react-router-dom"
import { data } from "../data/male_teams.json"

export function PlayerSearch({ short_name, overall, player_url, club_team_id, nation_team_id}){

    const badgeUrl = data.find(item => {
        if (item.team_id === club_team_id){
            return item.team_url
        }
        else {
            return "/team/1/arsenal/240002"
        }
    })

    const flagUrl = data.find(item => {
        if (item.team_id === nation_team_id){
            return item.team_url
        }
        else {
            return "/team/1318/england/240002"
        }
    })

    function onSearch(player){
        setValue(player)
    }

    return (
        <Link to={`/player/${short_name}`}>
            <div onClick={() => {
            onSearch(short_name)
            }}>
                <img src=""/>
                {`${short_name} - ${overall}`}
            </div>
        </Link>
        
    )
}