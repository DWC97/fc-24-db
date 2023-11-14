import { useState } from "react"

export default function App(){

  const [items, setItems] = useState([])

  function onSubmit(e){
    e.preventDefault()

    value = 
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
    </>
  )
}
