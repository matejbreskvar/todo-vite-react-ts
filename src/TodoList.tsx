import {useEffect, useState} from "react";
import Dialog from "./Dialog.tsx";
import Todo from "./Todo.tsx";
import TodoListProps from "./TodoListProps.tsx";
import "./styles/todoListStyles.css"

const MILLISECONDS_A_DAY = 86400000;  // Number of milliseconds in a day

export default function TodoList({ todos, setTodos }: TodoListProps) {
    const [open, setOpen] = useState(false);  // State to control dialog visibility
    const [input, setInput] = useState("");  // State to manage input value in dialog
    const [date, setDate] = useState<Date | null>(null);  // State to manage selected date in dialog
    const [text, setText] = useState("");  // State to manage text value in dialog

    // Effect to synchronize todos with local storage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Map through todos to create list items
    const arrayTodos = todos.map((todo: Todo) => {
        return (
            <li key={todo.id} className="liTodo">
                <label htmlFor={`checkboxTodo-${todo.id}`}>
                    <input
                        type="checkbox"
                        id={`checkboxTodo-${todo.id}`}
                        checked={todo.completed}
                        onChange={(e) => handleChecked(e.target.checked, todo.id)}
                    />
                    <div className="todoText">
                        <p onClick={() => openTodo(todo.id)}>{todo.title}</p>
                        <p className="dueDate">{todo.date !== null && daysLeft(todo.date)}</p>
                    </div>
                </label>
                {todo.completed &&
                    <button className="deleteButton" onClick={() => handleDelete(todo.id)}>
                        Delete
                    </button>
                }
            </li>
        );
    });

    // Function to handle checkbox state change
    function handleChecked(completed: boolean, id: string) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });
        });
    }

    // Function to handle deletion of a specific todo
    function handleDelete(id: string) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id);
        });
    }

    // Function to check if any todo is completed
    function checkCompleted() {
        let anyCompleted = false;
        todos.map((todo: Todo) => {
            if (todo.completed) {
                anyCompleted = true;
                return todo;
            }
        });
        return anyCompleted;
    }

    // Function to delete all completed todos
    function deleteAll() {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => !todo.completed);
        });
    }

    // Function to calculate days left or past for a todo
    function daysLeft(todoDate: Date) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // Reset hours for accurate day comparison
        const targetDate = new Date(todoDate);
        targetDate.setHours(0, 0, 0, 0);  // Reset hours for accurate day comparison
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const dayDifference = timeDifference / MILLISECONDS_A_DAY;

        if (dayDifference < -1) {
            return ` Due date was ${Math.abs(dayDifference)} days ago`;
        } else if (dayDifference === -1) {
            return ` Due date was yesterday`;
        } else if (dayDifference === 0) {
            return " Today";
        } else if (dayDifference === 1) {
            return " Tomorrow";
        } else {
            return ` ${dayDifference} days left`;
        }
    }

    // Function to open the dialog for adding/editing todos
    function openDialog() {
        setOpen(true);
    }

    // Function to open and prefill dialog with existing todo details
    function openTodo(id: string) {
        todos.map(todo => {
            if (todo.id === id) {
                setInput(todo.title);
                setDate(todo.date);
                setText(todo.text);
                openDialog();
            }
        });
    }


    return (
        <>
            <div className="wholeTodoList">
                <div className="newTodoNote">

                    {checkCompleted() &&
                        <button onClick={deleteAll} className="butDelAll">Delete All Completed</button>}
                    <button className="butNewItem" onClick={openDialog}>New Todo</button>
                </div>
                <div className="divTodoList">
                    <h2>Todo List</h2>
                    <ul className="todoList">
            {arrayTodos}
        </ul>
    </div>
            </div>
        <Dialog setTodos={setTodos} setInput={setInput} setDate={setDate} setText={setText} setOpen={setOpen} input={input} open={open} text={text} date={date}/>
        </>
)
}