import { Links, Meta, Scripts, useRouteError, isRouteErrorResponse } from '@remix-run/react'

export function ErrorBoundary() {
  const error = useRouteError()

  let errorMessage: string
  let statusCode: number | null = null

  if (isRouteErrorResponse(error)) {
    statusCode = error.status
    errorMessage = error.status === 404 ? 'Page Not Found' : error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'An unexpected error occurred'
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {statusCode && `${statusCode} - `}
              {errorMessage}
            </p>
            <a href="/" className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Go back home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
