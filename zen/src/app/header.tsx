"use client"
import { Toggle } from "@/components/ui/toggle"
import { useState } from "react"
export default function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
      };
    return <div className="dark:bg-slate-800 bg-slate-200 text-slate-900 dark:text-slate-50  flex items-center justify-around w-full h-12 border-t">
        <h1 className="md:text-2xl font-bold text-lg ">ZenSteet AI</h1>
        <ul className="flex items-center justify-center gap-2">
            <li className="text-xs md:text-base ">Home</li>
            <li className="text-xs md:text-base ">About</li>
            <li className="text-xs md:text-base ">Contact</li>
            <li className="text-xs md:text-base ">Carrer</li>
            <Toggle onClick={toggleDarkMode} variant="outline" className="bg-transparent dark:text-slate-50 text-slate-900 text-xs md:text-base " >{darkMode ? "Light" : "Dark"}</Toggle>
        </ul>
        {/* use shadcn ui for a toggle button to toggle dark mode */}

    </div>;
}