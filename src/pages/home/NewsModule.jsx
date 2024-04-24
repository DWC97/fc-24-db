export function NewsModule({ imageSrc, desc, url }){
    return (
        <a href={url} target="_blank" className="focus:scale-110 focus:outline-none">
            <div className="flex flex-col mx-2 relative ease-in-out duration-300 hover:scale-110">
                <img src={imageSrc} className="w-56 2xl:w-72 h-32 2xl:h-48 object-cover object-top"/>
                <span className="bg-custom-maroon/[.7] text-white font-light p-1 pl-3 text-sm absolute w-full bottom-0">{desc}</span>
            </div>
        </a>
        
    )
}