import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { lazy, Suspense, useState } from 'react'
import { SearchForm } from '~/components/SearchForm'
import type { Brewery } from '~/types/brewery'

export const meta: MetaFunction = () => {
  return [{ title: 'Brewery Finder - Discover Great Breweries' }, { description: 'Find and explore breweries across the United States' }]
}

const BreweryList = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return import('../components/BreweryList')
})

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

export default function Index() {
  const { breweries } = useLoaderData<typeof loader>()
  const [searchResults, setSearchResults] = useState<Brewery[]>(breweries)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Discover Breweries</h1>

      <SearchForm setSearchResults={setSearchResults} />

      <Suspense fallback={<LoadingGrid />}>
        <BreweryList searchResults={searchResults} />
      </Suspense>
    </div>
  )
}
