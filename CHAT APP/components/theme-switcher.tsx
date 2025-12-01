"use client"

import { useState } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "neon" | "white" | "blue" | "purple" | "sunset" | "ocean"

const themes = [
  { name: "Neon", value: "neon" as Theme, color: "text-neon-pink" },
  { name: "White", value: "white" as Theme, color: "text-slate-800" },
  { name: "Blue", value: "blue" as Theme, color: "text-blue-500" },
  { name: "Purple", value: "purple" as Theme, color: "text-purple-500" },
  { name: "Sunset", value: "sunset" as Theme, color: "text-orange-500" },
  { name: "Ocean", value: "ocean" as Theme, color: "text-teal-500" },
]

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("neon")

  const applyTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-neon-cyan hover:text-neon-cyan/80">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => applyTheme(theme.value)}
            className={cursor-pointer ${currentTheme === theme.value ? "bg-accent" : ""}}
          >
            <span className={theme.color}>{theme.name}</span>
            {currentTheme === theme.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}