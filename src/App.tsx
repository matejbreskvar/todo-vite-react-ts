import "./styles.css"
import {useState} from "react";
export default function App(){
    const[newItem,setNewItem]=useState("")
    const [todos, setTodos]=useState([])
    function handleSubmit(e){
        console.log(e)
        e.preventDefault()
        setTodos((currentTodos)=>{
            return [...currentTodos,{id:crypto.randomUUID(),title:newItem,completed:false},]
        })
    }
    return(
        <>
        <div className="newItemDiv">
        <form onSubmit={handleSubmit} className="newItemForm">
            <div className="formRow">
                <label htmlFor="newItemInputId">NEW ITEM</label>
                <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="newItemInputId"/>
            </div>
            <button className="formButton">Add</button>
        </form>
    </div>
    <h1>ToDo List</h1>
            <ul className="todoList">
                {todos.map}
            </ul>
        </>
    )
}
