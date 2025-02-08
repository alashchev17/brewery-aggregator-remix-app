'use client';
import { useState } from "react";
import type { Brewery } from "~/types/brewery";

interface SearchFormProps {
  setSearchResults: (results: Brewery[]) => void;
}

export function SearchForm({ setSearchResults }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json() as Brewery[];
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search breweries..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}