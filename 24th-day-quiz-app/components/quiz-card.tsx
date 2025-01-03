'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { Question } from '@/types/quiz'

interface QuizCardProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  score: number
  onAnswer: (answer: string) => void
  selectedAnswer: string | null
  isAnswered: boolean
}

export function QuizCard({
  question,
  currentQuestion,
  totalQuestions,
  score,
  onAnswer,
  selectedAnswer,
  isAnswered,
}: QuizCardProps) {
  const [] = useState(30)
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const answers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5)

  const getButtonVariant = (answer: string) => {
    if (!isAnswered) return 'outline'
    if (answer === question.correct_answer) return 'success'
    if (answer === selectedAnswer) return 'destructive'
    return 'outline'
  }

  const getAnswerIcon = (answer: string) => {
    if (!isAnswered) return null
    if (answer === question.correct_answer) {
      return <CheckCircle2 className="w-4 h-4 text-green-500" />
    }
    if (answer === selectedAnswer && answer !== question.correct_answer) {
      return <XCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-sm">
            Question {currentQuestion + 1}/{totalQuestions}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Score: {score}
          </Badge>
        </div>
        <Progress value={progress} className="mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{question.category}</Badge>
          <Badge 
            variant="outline" 
            className={
              question.difficulty === 'hard' ? 'text-red-500' :
              question.difficulty === 'medium' ? 'text-yellow-500' :
              'text-green-500'
            }
          >
            {question.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-xl">
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          <div className="grid gap-3">
            {answers.map((answer, index) => (
              <motion.div
                key={answer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
              <Button
  variant={getButtonVariant(answer)}
  className={`
    w-full 
    justify-between 
    text-left 
    h-auto 
    py-4 
    px-6 
    bg-white 
    border 
    rounded-lg 
    shadow-sm 
    transition 
    duration-300 
    ease-in-out 
    hover:bg-blue-100 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400 
    focus:ring-offset-2 
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `}
  onClick={() => !isAnswered && onAnswer(answer)}
  disabled={isAnswered}
>
  <span
    className="text-gray-800 font-medium"
    dangerouslySetInnerHTML={{ __html: answer }}
  />
  {getAnswerIcon(answer)}
</Button>

              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

