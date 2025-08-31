import { TONE_MATRIX } from "@/lib/prompts";
import { ToneCell } from "@/lib/types";
import { useState } from "react";
import { Spinner } from "./Spinner";

interface TonePickerProps {
    onToneSelect : (formality:string , verbosity:string) => Promise<void>;
    disabled?: boolean;

}

export function TonePicker({onToneSelect,disabled=false}:TonePickerProps){

    const [loadingCell , setLoadingCell] = useState<string | null>(null);

    const getCellStyle = (cell:ToneCell):string => {
        const baseStyle = `
            relative p-4 border border-gray-300 rounded-lg text-sm font-medium
            transition-all duration-200 cursor-pointer
            min-h-[80px] flex items-center justify-center text-center
        `;

        if(disabled){
            return `${baseStyle} bg-gray-100 text-gray-400 cursor-not-allowed`;
        }

        const cellKey = `${cell.formality}-${cell.verbosity}`;
        const isLoading = loadingCell == cellKey;

        if(isLoading){
            return `${baseStyle} bg-blue-50 border-blue-300 text-blue-700`;
        }

        return `${baseStyle} bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700`;
    }

    const handleCellClick = async (cell:ToneCell) =>{
        if(disabled) return;

        const cellKey = `${cell.formality}-${cell.verbosity}`;
        setLoadingCell(cellKey);

        try{
            await onToneSelect(cell.formality, cell.verbosity);
        }finally{   
            setLoadingCell(null);
        }
    };

    return(
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Tone Picker
                </h2>
                
            </div>

            <div className="grid grid-cols-3 gap-3 flex-1">
                {TONE_MATRIX.map((row,rowIndex)=>
                        row.map((cell ,cellIndex)=>{
                            const cellKey = `${cell.formality}-${cell.verbosity}`;
                            const isLoading = loadingCell === cellKey;

                            return(
                                <button
                                key={cellKey}
                                onClick={()=>handleCellClick(cell)}
                                disabled={disabled}
                                className={getCellStyle(cell)}
                                >
                                    {
                                        isLoading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Spinner size="sm"/>
                                                <span className="text-xs">Processing...</span>
                                            </div>
                                        ):(
                                            <span>
                                                {cell.label}
                                            </span>
                                        )
                                    }
                                </button>
                            );
                        })
                    )
                }
            </div>

        </div>
    )
}