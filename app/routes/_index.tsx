import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { lazy, Suspense, useMemo, useState } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { SearchForm } from '~/components/SearchForm'
import type { Brewery } from '~/types/brewery'

export const meta: MetaFunction = () => {
  return [{ title: 'Brewery Finder - Discover Great Breweries' }, { description: 'Find and explore breweries across the United States' }]
}

export async function loader() {
  const response = await fetch('https://api.openbrewerydb.org/v1/breweries')
  const breweries = (await response.json()) as Brewery[]
  return json({ breweries })
}

const LoadingGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-48"></div>
    ))}
  </div>
)

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="flex flex-col items-center justify-center p-8 mt-8 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
    <svg
      className="w-16 h-16 text-red-500 dark:text-red-400 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Oops! Something went wrong</h2>
    <p className="text-red-600 dark:text-red-300 mb-4 text-center max-w-md">
      {error?.message || 'There was an error loading the brewery list. Please try again.'}
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      Try Again
    </button>
  </div>
)

export default function Index() {
  const { breweries } = useLoaderData<typeof loader>()
  const [searchResults, setSearchResults] = useState<Brewery[]>(breweries)
  const [noMoreError, setNoMoreError] = useState(false)

  // Create memoized lazy component that depends on noMoreError state
  const BreweryListComponent = useMemo(
    () =>
      lazy(async () => {
        await new Promise((resolve, reject) => {
          setTimeout(noMoreError ? resolve : () => reject('Artificial Testing Error'), 1500)
        })
        return import('../components/BreweryList')
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchResults, noMoreError]
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Discover Breweries</h1>

      <SearchForm setSearchResults={setSearchResults} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setNoMoreError(true)}>
        <Suspense fallback={<LoadingGrid />}>
          <BreweryListComponent searchResults={searchResults} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
