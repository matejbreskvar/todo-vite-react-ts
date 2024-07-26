import {ChangeEvent, FormEvent, useState} from "react";
import {Todo} from "./Todo.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
    const [input, setInput] = useState("");
    const[todos,setTodos]=useState<Todo[]>([])
    const [date, setDate] = useState(new Date());

    const arrayTodos = todos.map((todo: Todo) => {
        return (
            <li className="liTodo">
                <label htmlFor="checkboxTodo">
                    {todo.value}
                    {todo.date!==null && (todo.date.getTime()-Date.now()).toString()}
                    <input type="checkbox" id="checkboxTodo" checked={todo.completed} onChange={(e) => handleChecked(e.target.checked,todo.id)} />
                </label>
                {todo.completed && <button className="deleteButton" onClick={()=>handleDelete(todo.id)}>Delete</button>}
            </li>)
    })

    function inputChange(e:ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        //console.log(input)
    }
    function addTodo(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(input==="")return
        setTodos(currentTodos=>{
            return [...currentTodos, {id:crypto.randomUUID(), value:input, completed:false, date:date}]
        })
        setInput("")
        setDate(new Date());
    }
    function handleChecked(completed:boolean,id: string ) {
        setTodos(currentTodos =>{
            return currentTodos.map(todo =>{
                if(todo.id===id){
                    return {...todo, completed}
                }
                return todo
            })
        })
    }
    function handleDelete(id:string) {
        setTodos(currentTodos =>{
            return currentTodos.filter(todo => todo.id !== id)
        })
    }
    function checkCompleted(){
        let anyCompleted = false
        todos.map((todo:Todo) => {
            if(todo.completed){
                anyCompleted = true
                return todo
            }
        })
        return anyCompleted
    }
    function deleteAll(){
        setTodos(currentTodos=>{
            return currentTodos.filter(todo => !todo.completed)
        })
    }
    return (
        <>
            <div className="divNewItemForm">
                <form onSubmit={addTodo} className="newItemForm">
                    <label htmlFor="inputNewItem"><h2>New Todo Note</h2>
                        <input onChange={inputChange} value={input} id="inputNewItem" className="inputNewItem"
                               type="text" placeholder="Enter new todo note"/>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </label>
                    <button type="submit" className="butNewItem">Add</button>
                    {checkCompleted()&&<button onClick={deleteAll} className="butDelAll">Delete All</button>}
                </form>
            </div>
            <div className="divTodoList">
            <ul className="todoList">
            {arrayTodos}
        </ul>
    </div>
</>

    )}