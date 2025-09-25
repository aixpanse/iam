"use client"
import * as React from "react"
import { Moon, Sun, Eclipse } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <div className="flex space-x-2">
            <Button onClick={() => setTheme("light")} variant="outline" size="icon">
                <Sun className="absolute " />
            </Button>
            <Button onClick={() => setTheme("dark")} variant="outline" size="icon">
                <Moon className="absolute" />
            </Button>
            <Button onClick={() => setTheme("system")} variant="outline" size="icon">
                <Eclipse className="absolute " />
            </Button>
        </div>

    )
}
