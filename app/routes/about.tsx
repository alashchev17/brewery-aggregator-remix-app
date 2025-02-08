import type { MetaFunction } from '@remix-run/node'
import { ErrorBoundary } from '~/components/ErrorBoundary'

export const meta: MetaFunction = () => {
  return [{ title: 'About - Brewery Finder' }, { description: 'Learn more about the Brewery Finder application' }]
}

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div
        className="relative overflow-hidden bg-gradient-to-br from-white/50 to-white/30 
                    dark:from-gray-800/90 dark:to-gray-900/90 rounded-2xl p-8 
                    shadow-lg backdrop-blur-sm border border-white/10 dark:border-white/5
                    transition-all duration-300 hover:shadow-xl group"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 
                      dark:from-amber-500/0 dark:to-amber-500/0 opacity-0 
                      group-hover:opacity-5 transition-opacity duration-300"
        />

        <div className="relative">
          <h1
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-amber-600 
                       dark:from-amber-400 dark:to-amber-500 inline-block bg-clip-text text-transparent"
          >
            About Brewery Finder
          </h1>

          <div className="space-y-10">
            <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
              Welcome to Brewery Finder, your ultimate guide to discovering amazing breweries across the United States. Our application uses
              the Open Brewery DB API to provide you with up-to-date information about breweries, their locations, and what makes each one
              unique.
            </p>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-amber-400">Features</h2>

              <ul className="list-none space-y-4 text-gray-700 dark:text-gray-200">
                {[
                  'Search breweries by city or state',
                  'View detailed information about each brewery',
                  'Dark mode support for comfortable viewing',
                  'Responsive design for mobile and desktop',
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 group/item pl-2 leading-relaxed 
                               transition-transform duration-200 hover:translate-x-2"
                  >
                    <span className="text-amber-500 dark:text-amber-400">•</span>
                    <span
                      className="group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 
                                   transition-colors duration-200"
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ErrorBoundary }
