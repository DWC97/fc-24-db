import { NavLink } from "react-router-dom";

export function NotFound(){
    return (
        <div className="flex justify-center items-center w-full flex-col">
            <span className="mt-56 text-custom-maroon font-semibold tracking-wider text-7xl font-mono">
                404
            </span>
            <span className="mt-2 mb-8 text-custom-maroon font-medium text-lg md:text-2xl px-8 text-center">
                The page you were looking for doesn't exist...
            </span>
            <NavLink to={"/"}><span className="hover:bg-custom-maroon text-custom-maroon border-2 border-custom-maroon hover:text-white flex px-4 py-2 rounded-md cursor-pointer text-base ease-in-out duration-300" >
                Return to home
            </span></NavLink>
        </div>
    )
}