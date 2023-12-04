import { useMemo, useRef, useState } from "react"

export default function WdsSearch(){

  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return item.toLowerCase().includes(query.toLowerCase())
    })
  }, [items, query]) 

  const inputRef = useRef()

  function onSubmit(e){
    e.preventDefault()

    const value = inputRef.current.value
    setItems(prev => {
      if (value === "") return [...prev]
      else {
        return [...prev, value]
      }
    })

    inputRef.current.value = ""
  }

  return (
    <>
      Search: <input value={query} onChange={e => setQuery(e.target.value)} type="search"></input>
      <br/>
      <br/>
      <form onSubmit={onSubmit}>
      New item: <input ref={inputRef}></input>
      <button>Add</button>
      </form>
      <br/>
      Items: 
      {filteredItems.map(item => {
        return (
        <>
          <div>{item}</div>
        </>
        )
        
      })}
    </>
  )
}
