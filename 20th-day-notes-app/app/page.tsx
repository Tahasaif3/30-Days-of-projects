'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Note {
  id: string
  title: string
  content: string
  color: string
}

const colors = ['#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD', '#F0E68C', '#FFB6C1'];

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (title.trim() === '' || content.trim() === '') return
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
    setIsDialogOpen(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const editNote = (id: string) => {
    const noteToEdit = notes.find(note => note.id === id)
    if (noteToEdit) {
      setTitle(noteToEdit.title)
      setContent(noteToEdit.content)
      setEditingId(id)
      setIsDialogOpen(true)
    }
  }

  const updateNote = () => {
    if (editingId) {
      setNotes(notes.map(note => 
        note.id === editingId ? { ...note, title, content } : note
      ))
      setTitle('')
      setContent('')
      setEditingId(null)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Notes App</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Note' : 'Add New Note'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <Button onClick={editingId ? updateNote : addNote} className="w-full">
                {editingId ? 'Update Note' : 'Add Note'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full" style={{ backgroundColor: note.color }}>
                  <CardContent className="p-4 flex flex-col h-full">
                    <h2 className="text-xl font-semibold mb-2 flex-grow">{note.title}</h2>
                    <p className="mb-4 flex-grow">{note.content}</p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => editNote(note.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

