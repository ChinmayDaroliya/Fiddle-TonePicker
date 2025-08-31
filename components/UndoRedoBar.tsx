import { Undo ,Redo , RotateCcw} from "lucide-react";
import { useEffect } from "react";

interface  UndoReoBarProps{
    canUndo : boolean;
    canRedo : boolean;
    onUndo : () => void;
    onRedo : () => void;
    onReset: () => void;
    disabled?: boolean;

}

export function UndoRedoBar ({
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onReset,
    disabled = false

}:UndoReoBarProps){
    // keyboard shortcut
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent) => {
            if(disabled) return;

            if(e.ctrlKey || e.metaKey){
                if(e.key === 'z' && !e.shiftKey && canUndo){
                    e.preventDefault();
                    onUndo();
                }else if((e.key === 'y' || (e.key === 'z' && e.shiftKey)) && canRedo){
                    e.preventDefault();
                    onRedo();
                }
            }
        };

        window.addEventListener('keydown',handleKeyDown);
        return () => window.removeEventListener('keydown',handleKeyDown);

    },[canUndo,canRedo,onUndo,onRedo,disabled]);

    return(
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <button
                onClick={onUndo}
                disabled={!canUndo || disabled}
                className={`
                        flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                        transition-colors duration-200
                        ${!canUndo || disabled 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }
                    `}
                    title="Undo (ctrl + Z)"
            >
                <Undo size={16}/>
                Undo
            </button>

            <button
                onClick={onRedo}
                disabled={!canRedo || disabled}
                className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                transition-colors duration-200
                ${!canRedo || disabled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
                `}
                title="Redo (Ctrl+Y)"
            >
                <Redo size={16} />
                Redo
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1"/>

            <button
                onClick={onReset}
                disabled={disabled}
                className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                transition-colors duration-200
                ${disabled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
                `}
                title="Reset to original"
            >
                <RotateCcw size={16} />
                Reset
            </button>
        </div>
    )
}