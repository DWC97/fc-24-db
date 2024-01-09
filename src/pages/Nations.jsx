import { useState } from "react"
import nationsData from "../data/nations.json"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';

export function Nations(){

    const [value, setValue] = useState("")

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">NATIONS</h1>
                <input type="text" placeholder="Search nation..." className="border-b-2 border-custom-grey py-2  font-medium text-custom-grey w-72 md:w-96 outline-none" value={value} onChange={(e) => {
                setValue(e.target.value)}}/>
            </div>
            <div className="my-8">
                {nationsData
                .filter(nation => {
                    if (value === "") return nation
                    else {
                        return value && nation.name.toLowerCase().includes(value.toLowerCase())
                    }    
                })
                .map((nation, index) => {
                    return (
                        <div className="odd:bg-slate-50 even:bg-white" key={index}>
                            <Link to={`/nations/${nation.name}`} >
                                <div className="flex flex-row relative items-center justify-between px-4  py-2">
                                    <img src={nation.code.length > 2 ? nation.code : `https://flagsapi.com/${nation.code}/flat/64.png`} className="w-12"/>
                                    <span className="absolute left-24 text-sm md:text-base md:left-28 text-custom-grey font-semibold tracking-widest">{nation.name.toUpperCase()}</span>
                                    <Icon icon="cil:arrow-right" color={"#2C2E2D"} />
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}