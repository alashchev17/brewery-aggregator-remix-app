import { Link } from '@remix-run/react'
import { useTheme } from '~/context/theme'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-600">
          Brewery Finder
        </Link>
        <div className="flex gap-4">
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-amber-600">
            About
          </Link>
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:text-amber-600">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
}
