import React from "react";

interface EditorProps {
    value:string;
    onChange: (value:string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export function Editor ({value,onChange,placeholder="Start typing your text here...",disabled=false}:EditorProps)  {


    return(
        <div className="flex flex-col h-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Text Editor
            </h2>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                        lex-1 p-4 border border-gray-300 rounded-lg resize-none
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        font-mono text-sm leading-relaxed
                        ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}
                        transition-colors duration-200
                    `}
                    rows={20}
            >
                <div className="">
                        {value.length} Characters
                </div>

            </textarea>

        </div>
    )
}
