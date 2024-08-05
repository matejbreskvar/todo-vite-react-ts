import TodoList from "./TodoList.tsx";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';
import Weather from "./Weather.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
            <Weather />
            </QueryClientProvider>
            <TodoList />
        </>
    )
}