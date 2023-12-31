import { Table } from "../components/Table";
import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Club(){

    const { id } = useParams()

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-row items-center mt-32 bg-custom-grey h-24">
                <img src="https://cdn.sofifa.net/meta/team/9/120.png" className="w-16 mx-8"/>
                <h1 className="text-white text-3xl font-medium tracking-widest">CLUB - {id.toUpperCase()}</h1>
            </div>
        </div>
    )
}