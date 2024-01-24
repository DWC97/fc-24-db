// hooks
import { useEffect, useRef } from "react"

// listens for when a user clicks outside of a given area
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