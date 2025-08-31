import {Inter} from 'next/font/google';
import { Metadata } from "next";
import "./globals.css";

const inter = Inter({subsets:['latin']});

export const metadata: Metadata = {
  title: 'Tone Picker Assignment',
  description: "Transform your text with tone Adjustment"
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}){
  return(
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}