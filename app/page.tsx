"use client"

import {Editor} from "@/components/Editor";
import { TonePicker } from "@/components/TonePicker";
import { UndoRedoBar } from "@/components/UndoRedoBar";
import { useHistory } from "@/hooks/useHistory";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { ToneRequest, ToneResponse } from "@/lib/types";


export default function Home() {

  const INITIAL_TEXT = "Welcome to the Tone Picker! This is a sample text that you can edit and transform using different tones. Try typing your own text and then click on different tone combinations to see how AI can rewrite your content in various styles.";


  const {
    currentText,
    updateCurrentText,
    canUndo,
    canRedo,
    undo,
    redo,
    reset,
    addToHistory

  } = useHistory(INITIAL_TEXT);

  const [isLoading ,SetIsLoading] =useState(false);

  const handleTextChange = (newText:string) => {
    updateCurrentText(newText);
  }

  const handleToneSelect = async(formality:string,verbosity:string) => {
      if(!currentText.trim()){
        toast.error('please enter some text first');
        return;
      }

      SetIsLoading(true);

      try{
          const request : ToneRequest = {
            text:currentText,
            formality: formality as any,
            verbosity: verbosity as any
          }

          const response = await fetch('/api/tone',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          });

          if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to rewrite text');
          }

          const data : ToneResponse = await response.json();

          if(!data.rewrittenText){
            throw new Error('no rewritten text recieved');
          }

          // add history and update current text
          addToHistory(data.rewrittenText);

          // show success message
          toast.success(
            data.cached ? 'Text rewritten (from cache)' : 'Text rewritten successfully'
          );


      }catch(error){
          console.error('Error  rewriting text: ',error);

          toast.error(
            error instanceof Error ? error.message : 'Failed to rewrite text. please try again.'
          );
      }finally{
        SetIsLoading(false);
      }
  }

  return (
      <div className="min-h-screen bg-gray-100" >
        <Toaster position="top-right"/>

        {/* header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">
              Tone Picker Text Tool
            </h1>
            <p className="text-gray-600 mt-1">
              Transform your Text with AI-powered tone Adjustment
            </p>
          </div>
        </header>

        {/* main content */}
        <main className="max-w-7xl mx-auto px-6  py-6">

          {/* controls */}
          <div className="mb-6">
            <UndoRedoBar
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={undo}
              onRedo={redo}
              onReset={reset}
              disabled={isLoading}
            />
          </div>

          {/* editor and tone picker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
            {/* left side text editor */}
              <div className="bg-white rounded-lg  shadow-sm  p-6">
                <Editor 
                  value={currentText}
                  onChange={handleTextChange}
                  disabled={isLoading}
                  placeholder="Start typing your text here..."
                />
              </div>

              {/* right side - tone picker */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <TonePicker
                  onToneSelect={handleToneSelect}
                  disabled={isLoading}
                />
              </div>


          </div>

        </main>


      </div>
  );
}
