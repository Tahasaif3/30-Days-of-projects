'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QuizCard } from '@/components/quiz-card'
import { QuizResults } from '@/components/quiz-results'
import { LandingPage } from '@/components/landing-page'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Question } from '@/types/quiz'

async function fetchQuizQuestions() {
  const response = await fetch(
    'https://opentdb.com/api.php?amount=10&type=multiple&encode=base64'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }
  const data = await response.json()
  return data.results.map((q: any) => ({
    ...q,
    question: atob(q.question),
    correct_answer: atob(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a: string) => atob(a)),
    category: atob(q.category),
    difficulty: atob(q.difficulty),
  }))
}

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [quizStarted, setQuizStarted] = useState(false)

  const { data: questions, isLoading, isError, refetch } = useQuery<Question[]>({
    queryKey: ['quiz-questions'],
    queryFn: fetchQuizQuestions,
    enabled: quizStarted,
  })

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions![currentQuestion].correct_answer
    if (isCorrect) setScore(score + 1)

    setSelectedAnswers([...selectedAnswers, answer])

    setTimeout(() => {
      if (currentQuestion === questions!.length - 1) {
        setShowResults(true)
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 1500)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setSelectedAnswers([])
    setQuizStarted(false)
    refetch()
  }

  const handleStart = () => {
    setQuizStarted(true)
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <LandingPage onStart={handleStart} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading questions...
        </Button>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading questions.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (!questions) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Interactive Quiz</h1>
        {showResults ? (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        ) : (
          <QuizCard
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            score={score}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswers[currentQuestion] || null}
            isAnswered={selectedAnswers.includes(questions[currentQuestion].correct_answer) ||
              selectedAnswers.includes(questions[currentQuestion].incorrect_answers[0]) ||
              selectedAnswers.includes(questions[currentQuestion].incorrect_answers[1]) ||
              selectedAnswers.includes(questions[currentQuestion].incorrect_answers[2])}
          />
        )}
      </div>
    </div>
  )
}

