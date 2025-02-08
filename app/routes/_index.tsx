import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { BreweryCard } from '~/components/BreweryCard'
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

export default function Index() {
  const { breweries } = useLoaderData<typeof loader>()
  const [searchResults, setSearchResults] = useState<Brewery[]>(breweries)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Discover Breweries</h1>

      <SearchForm setSearchResults={setSearchResults} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {searchResults.map((brewery) => (
          <BreweryCard key={brewery.id} brewery={brewery} />
        ))}
      </div>
    </div>
  )
}
