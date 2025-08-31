"use client"

import {Editor} from "@/components/Editor";
import { useHistory } from "@/hooks/useHistory";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const INITIAL_TEXT = "Welcome to the Tone Picker! This is a sample text that you can edit and transform using different tones. Try typing your own text and then click on different tone combinations to see how AI can rewrite your content in various styles.";


  const {
    currentText,
    updateCurrentText,

  } = useHistory(INITIAL_TEXT);

  const [isLoading ,SetIsLoading] =useState(false);

  const handleTextChange = (newText:string) => {
    updateCurrentText(newText);
  }

  return (
      <div className="min-h-screen bg-gray-100" >

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


          </div>

        </main>


      </div>
  );
}
