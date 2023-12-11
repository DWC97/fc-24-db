import { useEffect, useRef } from "react"

export function useClickOutside(handler){

    let domNode = useRef()
    
    useEffect(() => {

        function maybeHandler(e){
            if (!domNode.current?.contains(e.target)){
                handler()
            }    
        }

        document.addEventListener("mousedown", maybeHandler)

        return () => {
            document.removeEventListener("mousedown", maybeHandler)
        }
    })

    return domNode
}