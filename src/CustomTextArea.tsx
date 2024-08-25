import React, { ChangeEvent } from "react";

interface CustomTextAreaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    id?: string;
    className?: string; // Add className prop
    style?: React.CSSProperties; // Allow custom inline styles
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
                                                           value,
                                                           onChange,
                                                           placeholder,
                                                           id,
                                                           className,
                                                           style
                                                       }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        className={className} // Apply the className
        style={{
            resize: 'none', // Disable resizing
            width: '100%',  // Full width
            padding: '0.5rem', // Space inside the textarea
            border: '1px solid #ccc', // Light gray border
            borderRadius: '4px', // Rounded corners
            fontSize: '1rem', // Font size
            minHeight: '100px', // Minimum height
            boxSizing: 'border-box', // Include padding in width and height calculations
            ...style // Allow additional inline styles to be merged
        }}
    />
);

export default CustomTextArea;
