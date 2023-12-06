export function NewsModule({ imageSrc, desc, id }){
    return (
        <div className="flex flex-col mx-2 relative" key={id}>
            <img src={imageSrc} className="w-56 h-32 object-cover object-top"/>
            <span className="bg-custom-maroon/[.7] text-white font-light p-1 pl-3 text-sm absolute w-full bottom-0">{desc}</span>
        </div>
    )
}