import { Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { useTheme } from './context/theme'
import { Header } from './components/Header'

export function InnerApp() {
  const { theme } = useTheme()
  return (
    <body className={theme}>
      <Header />
      <main className={`${theme} min-h-screen bg-white dark:bg-gray-900`}>
        <Outlet />
      </main>
      <ScrollRestoration />
      <Scripts />
    </body>
  )
}
