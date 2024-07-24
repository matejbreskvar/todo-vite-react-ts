import {ChangeEvent, useState} from "react";
import {Todo} from "./Todo.tsx";

export default function App() {
    const [input, setInput] = useState("");
    const[todos,setTodos]=useState<Todo[]>([])
    const arrayTodos = todos.map((todo: Todo) => {
        return (
            <li>
                <label>
                    {todo.value}
                    <input type="checkbox" id="checkboxTodo"/>
                </label>
                <button className="delButton">Delete</button>
            </li>)
    })

    function inputChange(e:ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        //console.log(input)
    }
    function addTodo() {
        if(input==="")return
        setTodos(currentTodos=>{
            return [...currentTodos, {id:crypto.randomUUID(), value:input, completed:false}]
        })
        setInput("")
    }
    return(
<>
    <div className="divNewItemForm">
        <form className="newItemForm">
            <label htmlFor="inputNewItem"><h2>New Todo Note</h2>
                <input onChange={inputChange} value={input} id="inputNewItem" className="inputNewItem" type="text" placeholder="Enter new todo note"/>
            </label>
        </form>
        <button onClick={addTodo} className="butNewItem">Add</button>
    </div>
    <div className="divTodoList">
        <ul className="todoList">
            {arrayTodos}
        </ul>
    </div>
</>

    )}