import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import  Todo  from "./Todo";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles/calendarStyles.css"

export default function MyCalendar({ todos }: { todos: Todo[] }) {
    // State to hold todos filtered by selected date
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    // State to manage the visibility of the dialog
    const [open, setOpen] = useState(false);

    // Function to handle day clicks on the calendar
    function handleDayClick(value: Date) {
        filterTodos(value);  // Filter todos for the selected date
        setOpen(true);  // Open the dialog
    }

    // Function to filter todos based on the selected date
    function filterTodos(selectedDate: Date) {
        const filtered = todos.filter(todo => {
            if (!todo.date) return false;  // Skip todos without a date
            const todoDate = new Date(todo.date);
            return (
                todoDate.getFullYear() === selectedDate.getFullYear() &&
                todoDate.getMonth() === selectedDate.getMonth() &&
                todoDate.getDate() === selectedDate.getDate()
            );
        });
        setFilteredTodos(filtered);  // Update the state with filtered todos
    }

    // Function to close the dialog
    function handleClose(){
        setOpen(false);  // Set the dialog visibility to false
    }

    // Function to truncate text if it exceeds a maximum length
    function truncateText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";  // Truncate and append ellipsis
        }
        return text;  // Return text as is if it's within the limit
    }

    return (
        <div className="calendarDiv">
            <Calendar
                value={new Date}
                onClickDay={handleDayClick}
                className="calendar-body"
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const hasTodos = todos.some(todo => {
                            if (!todo.date) return false;
                            const todoDate = new Date(todo.date);
                            return (
                                todoDate.getFullYear() === date.getFullYear() &&
                                todoDate.getMonth() === date.getMonth() &&
                                todoDate.getDate() === date.getDate()
                            );
                        });
                        return hasTodos ? <div className="dot"></div> : null;
                    }
                    return null;
                }}
            />
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay"/>
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="dialogTitle">Title</Dialog.Title>
                        <ul className="todoList">
                            {filteredTodos.length === 0 ? (
                                <p>No todos for this day.</p>
                            ) : (
                                filteredTodos.map((todo) => (
                                    <li key={todo.id} className="liTodo">
                                        <label htmlFor={`checkboxTodo-${todo.id}`}>
                                            {todo.title} | {todo.date && new Date(todo.date).toDateString()} | {truncateText(todo.text, 30-todo.title.length)}
                                        </label>
                                    </li>
                                ))
                            )}
                        </ul>
                        <button className="closeButton" onClick={handleClose}>Close</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
