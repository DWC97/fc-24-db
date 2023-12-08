import { Link } from "react-router-dom"
// import { data } from "../data/male_teams.json"

export function PlayerSearch({ short_name, overall, player_id, club_team_id, nation_team_id}){

    // const badgeUrl = data.find(item => {
    //     if (item.team_id === club_team_id){
    //         return item.team_url
    //     }
    //     else {
    //         return "/team/1/arsenal/240002"
    //     }
    // })

    // const flagUrl = data.find(item => {
    //     if (item.team_id === nation_team_id){
    //         return item.team_url
    //     }
    //     else {
    //         return "/team/1318/england/240002"
    //     }
    // })

    function splitId(id){
        console.log(id)
        const firstId = id.slice(0, 3)
        const secondId = id.slice(3, 6)
        return `${firstId}/${secondId}`
    }

    function onSearch(player){
        setValue(player)
    }

    return (
        <Link to={`/player/${short_name}`}>
            <div onClick={() => {
            onSearch(short_name)
            }}>
                <img src={`https://cdn.sofifa.net/players/${splitId("231747")}/24_120.png`}/>
                {`${short_name} - ${overall}`}
            </div>
        </Link>
        
    )
}