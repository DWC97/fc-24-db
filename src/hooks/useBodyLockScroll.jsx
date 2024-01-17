import React, { useEffect, useState } from 'react'

function useBodyLockScroll() {

    const [locked, setLocked] = useState(false)
    const bodyStyle = document.body.style

    useEffect(() => {
        if (locked){
            bodyStyle.overflowY = "hidden"
        }
        else {
            bodyStyle.overflowY = "auto"
        }
    }, [locked])

    function toggle(){
        setLocked(!locked)
    }

    return [locked, toggle]
}

export default useBodyLockScroll