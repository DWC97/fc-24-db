import { Table } from "../components/Table";
import { useParams } from "react-router-dom"
import { RouteError } from "../components/RouteError";

export function Club(){

    const { id } = useParams()

    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36 h-96 bg-blue-600">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">{id}</h1>

            </div>
        </div>
    )
}