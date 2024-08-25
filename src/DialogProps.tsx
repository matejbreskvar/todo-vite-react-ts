import Todo from './Todo';
import React from "react";
export default interface DialogProps {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    input: string;
    open: boolean;
    text: string;
    date: Date | null;
}
