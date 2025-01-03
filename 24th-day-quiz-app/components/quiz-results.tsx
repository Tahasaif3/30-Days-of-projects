import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, RefreshCcw } from 'lucide-react'

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = (score / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl font-bold mb-2">{score} / {totalQuestions}</h2>
            <p className="text-muted-foreground">
              You scored {percentage}%
            </p>
          </div>
          <Button onClick={onRestart} className="w-full">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

