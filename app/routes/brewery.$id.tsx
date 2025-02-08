import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ErrorBoundary } from '~/components/ErrorBoundary'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data ? `${data.brewery.name} - Brewery Details` : 'Brewery Not Found' },
    { description: data ? `Learn more about ${data.brewery.name} brewery` : 'Brewery information' },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${params.id}`)

  if (!response.ok) {
    throw new Response('Brewery not found', { status: 404 })
  }

  const brewery = await response.json()
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('GOOGLE_MAPS_API_KEY is not set in environment variables')
  }

  return json({ brewery, GOOGLE_MAPS_API_KEY })
}

export default function BreweryDetails() {
  const { brewery, GOOGLE_MAPS_API_KEY } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">{brewery.name}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-medium text-gray-600 dark:text-gray-300">Type</dt>
                <dd className="text-gray-800 dark:text-white">{brewery.brewery_type}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600 dark:text-gray-300">Address</dt>
                <dd className="text-gray-800 dark:text-white">
                  {brewery.street}
                  <br />
                  {brewery.city}, {brewery.state} {brewery.postal_code}
                </dd>
              </div>
              {brewery.phone && (
                <div>
                  <dt className="font-medium text-gray-600 dark:text-gray-300">Phone</dt>
                  <dd className="text-gray-800 dark:text-white">{brewery.phone}</dd>
                </div>
              )}
              {brewery.website_url && (
                <div>
                  <dt className="font-medium text-gray-600 dark:text-gray-300">Website</dt>
                  <dd>
                    <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
                      Visit Website
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                title="Map"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                  `${brewery.name} ${brewery.street} ${brewery.city} ${brewery.state}`
                )}`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ErrorBoundary }
