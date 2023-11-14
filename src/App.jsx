import { useRef, useState } from "react"

export default function App(){

  const [items, setItems] = useState([])
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
      Search: <input></input>
      <br/>
      <br/>
      <form onSubmit={onSubmit}>
      New item: <input ref={inputRef}></input>
      <button>Add</button>
      </form>
      <br/>
      Items: 
      {items.map(item => {
        return <div>{item}</div>
      })}
    </>
  )
}
