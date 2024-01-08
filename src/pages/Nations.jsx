import { useState } from "react"
import nationsData from "../data/male_teams.json"
import newNationsData from "../data/nations.json"

export function Nations(){

    const [value, setValue] = useState("")
    const nationsArray = nationsData.results.filter(item => item.league_name === "Friendly International" 
    ).sort(compareByName)
    const filteredNationsData = removeDuplicates(nationsArray, it => it.team_name)

    function compareByName(a, b) {
        return a.team_name.localeCompare(b.team_name);
    }

    function removeDuplicates(data, key){
        return [
            ...new Map(
                data.map(item => [key(item), item])
            ).values()
        ]
    }

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">NATIONS</h1>
                <input type="text" placeholder="Search nation..." className="border-b-2 border-custom-grey py-2  font-medium text-custom-grey w-72 md:w-96 outline-none" value={value} onChange={(e) => {
                setValue(e.target.value)}}/>
            </div>
            <div>
                {newNationsData.map((nation, index) => {
                    return (
                        <div key={index} className="flex flex-row">
                            <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-10"/>
                            <span>{nation.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}