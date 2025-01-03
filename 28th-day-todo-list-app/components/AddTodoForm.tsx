import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface AddTodoFormProps {
  addTodo: (text: string) => void
}

export default function AddTodoForm({ addTodo }: AddTodoFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== '') {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow px-4 py-2 bg-transparent focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>
    </form>
  )
}

