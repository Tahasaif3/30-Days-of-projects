'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, LinkIcon, Twitter, ArrowLeft, Github, Users, Book } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  blog: string
  twitter_username: string
  public_repos: number
  followers: number
  following: number
}

export default function ExplorePage() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUser = async () => {
    setLoading(true)
    setError('')
    setUser(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError('User not found. Please try again.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-teal-500 flex flex-col items-center justify-start p-4">
      <Link href="/" className="self-start">
        <Button variant="ghost" className="text-white hover:text-purple-200">
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Button>
      </Link>

      <Card className="w-full max-w-3xl mt-8 bg-white bg-opacity-10 backdrop-blur-sm text-white">
        <CardContent className="p-6">
          <motion.h1 
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            GitHub Profile Explorer
          </motion.h1>
          <motion.div 
            className="flex space-x-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-grow bg-white bg-opacity-20 text-white placeholder-gray-300 border-none"
            />
            <Button onClick={fetchUser} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center"
              >
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}

            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-300 text-center"
              >
                {error}
              </motion.p>
            )}

            {user && (
              <motion.div
                key="user"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mb-4 border-4 border-purple-400"
                />
                <motion.h2 
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {user.name}
                </motion.h2>
                <motion.p 
                  className="text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  @{user.login}
                </motion.p>
                {user.bio && (
                  <motion.p 
                    className="text-center mt-2 max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {user.bio}
                  </motion.p>
                )}

                <motion.div 
                  className="grid grid-cols-3 gap-4 mt-6 w-full max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <StatCard icon={<Book size={18} />} label="Repos" value={user.public_repos} />
                  <StatCard icon={<Users size={18} />} label="Followers" value={user.followers} />
                  <StatCard icon={<User size={18} />} label="Following" value={user.following} />
                </motion.div>

                <motion.div 
                  className="mt-6 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {user.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-2" size={18} />
                      <span>{user.location}</span>
                    </div>
                  )}

                  {user.blog && (
                    <div className="flex items-center">
                      <LinkIcon className="mr-2" size={18} />
                      <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                        {user.blog}
                      </a>
                    </div>
                  )}

                  {user.twitter_username && (
                    <div className="flex items-center">
                      <Twitter className="mr-2" size={18} />
                      <a
                        href={`https://twitter.com/${user.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:underline"
                      >
                        @{user.twitter_username}
                      </a>
                    </div>
                  )}
                </motion.div>

                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7 }}
>
  <Button
    className="mt-6 bg-purple-600 hover:bg-purple-700"
    onClick={() => window.open(`https://github.com/${user.login}`, '_blank')}
  >
    <Github className="mr-2" size={18} />
    View on GitHub
  </Button>
</motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 p-3 rounded-lg">
      {icon}
      <span className="text-lg font-semibold mt-1">{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

