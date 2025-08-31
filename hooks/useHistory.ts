import { useCallback, useEffect, useState } from "react";
import { HistoryState } from "@/lib/types";


interface UseHistoryReturn {
    currentText:string;
    history: HistoryState[];
    currentIndex:number;
    updateCurrentText:(text:string) =>void;
    canUndo :boolean;
    canRedo:boolean;
    undo: () => void;
    redo: () => void;
    reset: () => void;
    addToHistory:(text:string)=>void;
}

const STORAGE_KEY = 'tone-picker-history';

export function useHistory(initialText:string = ''):UseHistoryReturn{
    const [history, setHistory] = useState<HistoryState[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText,setCurrentText] = useState(initialText);

    // initialize history on mount
    useEffect(()=>{
        try{
            const saved = localStorage.getItem(STORAGE_KEY);
            if(saved){
                const {history:savedHistory, index:savedIndex} = JSON.parse(saved);
                if(savedHistory && savedHistory.length > 0){
                    setHistory(savedHistory);
                    setCurrentIndex(savedIndex);
                    setCurrentText(savedHistory[savedIndex]?.text || initialText);
                    return;
                }
            }
        }catch(e){
            console.warn('Failed to load history from localStorage:',e);
        }

        const initialHistory = [{text:initialText, timestamp:Date.now()}];
        setHistory(initialHistory);
        setCurrentIndex(0);
        setCurrentText(initialText);

    },[initialText]);

    // saved to localStorage whenever history changes
    useEffect(()=>{
        if(history.length>0){
            try{
                localStorage.setItem(STORAGE_KEY,JSON.stringify({
                    history,
                    index:currentIndex
                }));

            }catch(e){
                console.warn('Failed to save history to localStorage',e);
            }
        }
    },[history,currentIndex]);

    const addToHistory = useCallback((text:string)=>{
        setHistory(prev => {
            // remove any future history(redo items)
            const newHistory = prev.slice(0,currentIndex+1);
            // add new entry
            newHistory.push({text,timestamp:Date.now()});
            return newHistory;
        });
        setCurrentIndex(prev => prev+1);
        setCurrentText(text);
    },[currentIndex]);

    const undo = useCallback(()=>{
        if(currentIndex>0){
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentText(history[newIndex].text);
        }
    },[currentIndex,history]);

    const redo = useCallback(()=>{
        if(currentIndex < history.length - 1){
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setCurrentText(history[newIndex].text);
        }
    },[currentIndex, history]);

     const reset = useCallback(() => {
        if (history.length > 0) {
        setCurrentIndex(0);
        setCurrentText(history[0].text);
        }
    }, [history]);

    const updateCurrentText = useCallback((text:string)=>{
        setCurrentText(text);
        // update the current history entry
        setHistory(prev => {
            const newHistory = [...prev];
            if(newHistory[currentIndex]){
                newHistory[currentIndex] = {text,timestamp:Date.now()};
            }
            return newHistory;
        })
    },[currentIndex]);
    
    
    return{
         currentText,
         history,
         currentIndex,
         updateCurrentText,
         canUndo: currentIndex > 0,
         canRedo: currentIndex < history.length - 1,
         undo,
         redo,
         reset,
         addToHistory
    }
}