import { motion, AnimatePresence } from 'framer-motion'
import { Todo } from '../app/page'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  toggleTodo: (id: string) => void
  editTodo: (id: string, newText: string) => void
  deleteTodo: (id: string) => void
}

export default function TodoList({ todos, toggleTodo, editTodo, deleteTodo }: TodoListProps) {
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

