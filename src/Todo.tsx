export default interface Todo {
    id: string;
    title: string;
    text: string;
    completed: boolean;
    date: Date|null
}