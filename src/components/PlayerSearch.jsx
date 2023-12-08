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

    // function splitId(id){
    //     console.log(id)
    //     const firstId = id.slice(0, 3)
    //     const secondId = id.slice(3, 6)
    //     return `${firstId}/${secondId}`
    // }

    function onSearch(player){
        setValue(player)
    }

    return (
        <Link to={`/player/${short_name}`}>
            <div onClick={() => {
            onSearch(short_name)
            }} className="flex flex-row relative bg-gray-50 items-center w-96 justify-between py-1 border-b border-gray-300">
                <div className="pl-4 flex flex-row items-center justify-center">
                    <img src={`https://cdn.sofifa.net/players/231/747/24_120.png`} className="w-7"/>
                    <img src={`https://cdn.sofifa.net/meta/team/9/120.png`} className="w-5 h-5 ml-6 mr-8"/>
                    <img src={`https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png`} className="w-6 h-4"/>
                </div>
                <span className="text-xs text-custom-maroon font-medium absolute ml-48">{short_name}</span>
                <span className="pr-4 font-semibold text-custom-maroon">{overall}</span>
            </div>
        </Link>
        
    )
}