import { useState } from 'react'
import { motion } from 'framer-motion'
import { Todo } from '../app/page'
import { Check, X, Edit, Trash } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  toggleTodo: (id: string) => void
  editTodo: (id: string, newText: string) => void
  deleteTodo: (id: string) => void
}

export default function TodoItem({ todo, toggleTodo, editTodo, deleteTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() !== '') {
      editTodo(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center bg-white rounded-lg shadow p-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 ${
          todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white m-auto" />}
      </motion.button>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          className="flex-grow bg-gray-100 rounded px-2 py-1 mr-2"
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex-shrink-0 space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-600"
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

