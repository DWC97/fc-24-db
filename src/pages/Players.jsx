export function Players(){
    return (
        <div className="w-full flex flex-col px-5 md:px-10 lg:px-20">
            <div className="flex flex-col mt-36">
                <h1 className="text-custom-maroon text-2xl font-semibold tracking-widest mb-4">FC 24 PLAYERS</h1>
                <p className="text-custom-grey">Ratings & statistics for male players in Europe’s top five leagues. </p>
            </div>

            <div className="flex flex-row justify-between mt-12 font-medium">
                <p className="text-gray-500">Showing 5325 results</p>
                <p className="text-custom-maroon">Filter by position and sort by attributes</p>
                <button className="bg-custom-maroon text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => {console.log("clicked")}}>Remove Filters</button>
            </div>
        </div>
    )
}