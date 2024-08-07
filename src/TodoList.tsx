import * as Dialog from "@radix-ui/react-dialog";
import DatePicker from "react-datepicker";
import {Flex, TextArea} from "@radix-ui/themes";
import {ChangeEvent, useEffect, useState} from "react";
import {Todo} from "./Todo.tsx";
import TodoListProps from "./TodoListProps.tsx";

const MILLISECONDS_A_DAY  = 86400000;
const MAX_LENGTH_INPUT = 100;

export default function TodoList({todos, setTodos}: TodoListProps){

    const [input, setInput] = useState("");
    const [date, setDate] = useState<Date|null>(null);
    const [open, setOpen] = useState(false);
    const [text,setText] = useState("");
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])
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
    function handleCancel(){
        setOpen(false)
        setInput("")
        setDate(null)
        setText("")
    }

    return (
        <>
        <div className="newTodoNote">
            <h2>New Todo Note</h2>
            <button className="butNewItem" onClick={openDialog}>New</button>
            {checkCompleted() &&
                <button onClick={deleteAll} className="butDelAll">Delete All Completed</button>}
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
                <Flex direction="column" gap="3" maxWidth="250px">
                    <TextArea value={text} onChange={e => {
                        setText(e.target.value)
                    }} className="nonResizableTextArea" placeholder="Description…"/>
                </Flex>
                <button onClick={addTodo}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
        </>
)
}