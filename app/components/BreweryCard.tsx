import { Link } from "@remix-run/react";
import type { Brewery } from "~/types/brewery";

interface BreweryCardProps {
  brewery: Brewery;
}

export function BreweryCard({ brewery }: BreweryCardProps) {
  return (
    <Link
      to={`/brewery/${brewery.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl 
                transition-shadow duration-200 overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {brewery.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)} Brewery
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          {brewery.address_1}<br />
          {brewery.city}, {brewery.state}
        </p>
      </div>
    </Link>
  );
}