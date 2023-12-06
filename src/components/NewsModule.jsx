export function NewsModule({ imageSrc, desc, url }){
    return (
        <a href={url}>
            <div className="flex flex-col mx-2 relative ease-in-out duration-300 hover:scale-110">
                <img src={imageSrc} className="w-56 h-32 object-cover object-top"/>
                <span className="bg-custom-maroon/[.7] text-white font-light p-1 pl-3 text-sm absolute w-full bottom-0">{desc}</span>
            </div>
        </a>
        
    )
}