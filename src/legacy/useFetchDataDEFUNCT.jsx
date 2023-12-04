import { useEffect } from "react"
import axios from "axios"

export function useFetchData(){

    useEffect(() => {

        axios.get("data.json")
            .then(res => {
                // setData(res.data);
                // setLoading(false);
                console.log(res.data)
            })
            .catch(() => {
                alert('Error')
            })

    }, [])

    return (
        null
    )
}