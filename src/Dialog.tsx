import DatePicker from "react-datepicker";
import CustomTextArea from "./CustomTextArea.tsx";
import * as ReactDialog from "@radix-ui/react-dialog";
import  {ChangeEvent} from "react";
import DialogProps from "./DialogProps.tsx";
import "./styles/dialogStyles.css"

const MAX_LENGTH_INPUT = 100;  // Maximum length for the input field

export default function Dialog({
                                   setTodos,
                                   setInput,
                                   setDate,
                                   setText,
                                   setOpen,
                                   input,
                                   open,
                                   text,
                                   date
                               }: DialogProps) {

    // Function to handle dialog state change
    function dialogOnChange(open: boolean) {
        if (!open) {
            setInput("");  // Clear input when dialog is closed
            setDate(null);  // Clear date when dialog is closed
            setText("");  // Clear text when dialog is closed
        }
        setOpen(open);  // Update dialog open state
    }

    // Function to handle cancel button click
    function handleCancel() {
        setOpen(false);  // Close the dialog
        setInput("");  // Clear input
        setDate(null);  // Clear date
        setText("");  // Clear text
    }

    // Function to add a new todo item
    function addTodo() {
        if (input === "") return;  // Do nothing if input is empty
        setTodos(currentTodos => {
            return [...currentTodos, { id: crypto.randomUUID(), title: input, text: text, completed: false, date: date }];
        });
        setText("");  // Clear text after adding todo
        setOpen(false);  // Close the dialog
        setInput("");  // Clear input
        setDate(null);  // Clear date
    }

    // Function to handle input field changes
    function inputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);  // Update input state
    }

return (
    <ReactDialog.Root open={open} onOpenChange={dialogOnChange}>
        <ReactDialog.Portal>
            <ReactDialog.Overlay className="DialogOverlay" />
            <ReactDialog.Content className="DialogContent">
                <ReactDialog.Title className="dialogTitle">Add New Todo</ReactDialog.Title>
                <form className="dialogForm">
                    <label htmlFor="inputNewItem" className="formLabel">
                        <input
                            maxLength={MAX_LENGTH_INPUT}
                            onChange={inputChange}
                            value={input}
                            id="inputNewItem"
                            className="inputNewItem"
                            type="text"
                            placeholder="Enter new todo note"
                        />
                    </label>
                    <div className="datePickerContainer">
                        <div className="selectDateText">
                            <p>Select a date:</p>
                        </div>
                        <label htmlFor="datePicker" className="datePickerLabel">
                            <DatePicker
                                selected={date ?? undefined} // Handle null date
                                onChange={(date: Date | null) => setDate(date)}
                                className="datePicker"
                                id="datePicker"
                            />
                        </label>
                    </div>
                    <label htmlFor="textArea" className="formLabel">
                        <CustomTextArea
                            value={text}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                            placeholder="Description…"
                            id="textArea"
                            className="nonResizableTextArea"
                        />
                    </label>
                </form>
                <div className="buttonContainer">
                    <button className="saveButton" onClick={addTodo}>Save</button>
                    <button className="cancelButton" onClick={handleCancel}>Cancel</button>
                </div>
            </ReactDialog.Content>
        </ReactDialog.Portal>
    </ReactDialog.Root>
)
}