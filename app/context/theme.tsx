'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

const isClient = typeof window !== 'undefined'

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    if (isClient) {
      const savedTheme = window.localStorage.getItem('theme') as Theme
      setTheme(savedTheme ?? 'light')
    }
  }, [])

  const toggleTheme = () => {
    console.log(`[DEBUG]: toggling theme..`)
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      if (isClient) {
        window.localStorage.setItem('theme', newTheme)
      }
      return newTheme
    })
  }

  const value = {
    theme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
