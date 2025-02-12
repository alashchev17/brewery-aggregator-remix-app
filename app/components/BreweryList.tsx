import { Brewery } from '~/types/brewery'
import { BreweryCard } from './BreweryCard'

const BreweryList = ({ searchResults }: { searchResults: Brewery[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {searchResults.map((brewery) => (
        <BreweryCard key={brewery.id} brewery={brewery} />
      ))}
    </div>
  )
}

export default BreweryList
