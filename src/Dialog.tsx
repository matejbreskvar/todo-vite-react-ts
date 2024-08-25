import DatePicker from "react-datepicker";
import CustomTextArea from "./CustomTextArea.tsx";
import * as ReactDialog from "@radix-ui/react-dialog";
import  {ChangeEvent} from "react";
import DialogProps from "./DialogProps.tsx";
import "./styles/dialogStyles.css"


const MAX_LENGTH_INPUT = 100;

export default function Dialog({setTodos, setInput, setDate, setText, setOpen, input, open, text, date}:DialogProps) {


    function dialogOnChange(open:boolean){
        if(!open) {
            setInput("")
            setDate(null)
            setText("")
        }
         setOpen(open)
    }

    function handleCancel(){
        setOpen(false)
        setInput("")
        setDate(null)
        setText("")
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

    function inputChange(e:ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
        //console.log(input)
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