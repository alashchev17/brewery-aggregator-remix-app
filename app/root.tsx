import { Links, Meta } from '@remix-run/react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { ThemeProvider } from './context/theme'
import styles from './tailwind.css?url'
import { InnerApp } from './InnerApp'
import { ErrorBoundary } from '~/components/ErrorBoundary'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const meta: MetaFunction = () => {
  return [{ title: 'Brewery Finder' }, { name: 'description', content: 'Find the best breweries near you!' }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <ThemeProvider>
        <InnerApp />
      </ThemeProvider>
    </html>
  )
}

export { ErrorBoundary }
