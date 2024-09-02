import TodoList from "./TodoList.tsx";
import "react-datepicker/dist/react-datepicker.css";
import './styles/styles.css';
import Weather from "./Weather.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MyCalendar from "./Calendar.tsx";
import {useState} from "react";
import Todo from "./Todo.tsx";

const queryClient = new QueryClient();

export default function App() {
    // State to manage the todos, initialized from localStorage if available
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem("todos")
        return (savedTodos !== null) ? JSON.parse(savedTodos) : [];
    })


    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Weather/>
            </QueryClientProvider>
            <TodoList todos={todos} setTodos={setTodos}/>
            <MyCalendar todos={todos}/>
        </>
    )
}