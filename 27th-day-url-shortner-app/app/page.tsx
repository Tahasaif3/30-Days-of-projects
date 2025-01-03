import UrlShortener from '../components/UrlShortener'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">URL Shortener App</h1>
        <UrlShortener />
      </div>
    </main>
  )
}

