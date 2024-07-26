import {ChangeEvent, useState} from "react";
import {Todo} from "./Todo.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Dialog from '@radix-ui/react-dialog';
import {Flex, TextArea} from "@radix-ui/themes";
import './styles.css';

const MILLISECONDS_A_DAY  = 86400000;
const MAX_LENGTH_INPUT = 100;

export default function App() {
    const [input, setInput] = useState("");
    const[todos,setTodos]=useState<Todo[]>([])
    const [date, setDate] = useState<Date|null>(null);
    const [open, setOpen] = useState(false);
    const [text,setText] = useState("");

    const arrayTodos = todos.map((todo: Todo) => {
        return (
            <li key={todo.id} className="liTodo">
                <label htmlFor="checkboxTodo">
                    {todo.title} |
                    {todo.date!==null && daysLeft(todo.date)}
                    <input type="checkbox" id="checkboxTodo" checked={todo.completed} onChange={(e) => handleChecked(e.target.checked,todo.id)} />
                </label>
                {todo.completed && <button className="deleteButton" onClick={()=>handleDelete(todo.id)}>Delete</button>}
            </li>)
    })

    function inputChange(e:ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        //console.log(input)
    }
    function addTodo() {
        if(input==="")return
        setTodos(currentTodos=>{
            return [...currentTodos, {id:crypto.randomUUID(), title:input, text:text, completed:false, date:date}]
        })
        setText("")
        setOpen(false);
        setInput("")
        setDate(null);
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
    function daysLeft(todoDate:Date) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const targetDate = new Date(todoDate);
        targetDate.setHours(0, 0, 0, 0);
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const dayDifference = timeDifference / MILLISECONDS_A_DAY
        if(dayDifference<-1){
            return ` Due date was ${Math.abs(dayDifference)} days ago`
        }else if(dayDifference===-1){
            return ` Due date was yesterday`
        }else if(dayDifference===0){
            return " Today"
        }else if(dayDifference===1){
            return " Tomorrow"
        }else{
            return ` ${dayDifference} days left`
        }
    }
    function openDialog(){
        setOpen(true)
    }
    return (
        <>
            <div className="newTodoNote">
                <h2>New Todo Note</h2>
                <button className="butNewItem" onClick={openDialog}>New</button>
                {checkCompleted() &&
                    <button onClick={deleteAll} className="butDelAll">Delete All</button>}
            </div>
            <div className="divTodoList">
                <ul className="todoList">
                {arrayTodos}
                </ul>
            </div>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay"/>
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="dialogTitle">Title</Dialog.Title>
                        <div className="divNewItemForm">
                            <form className="newItemForm">
                                <label htmlFor="inputNewItem">
                                    <input maxLength={MAX_LENGTH_INPUT} onChange={inputChange} value={input}
                                           id="inputNewItem"
                                           className="inputNewItem"
                                           type="text" placeholder="Enter new todo note"/>
                                    <DatePicker selected={date} onChange={(date) => setDate(date)}/>
                                </label>
                            </form>
                        </div>
                        <Flex direction="column" gap="3">
                                <TextArea resize="none" size="3" placeholder="Description..."/>
                        </Flex>
                        <button onClick={addTodo}>Save</button>
                        <button>Cancel</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}