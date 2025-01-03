import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, PlayCircle } from 'lucide-react'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            Interactive Quiz
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Test your knowledge with our exciting quiz!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Get ready to challenge yourself with a variety of questions across different categories.
            </p>
            <p className="font-semibold">
              Are you up for the challenge?
            </p>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> 10 exciting questions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Various difficulty levels
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Instant feedback on your answers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Track your score as you go
            </li>
          </ul>
          <Button onClick={onStart} className="w-full text-lg py-6">
            <PlayCircle className="w-6 h-6 mr-2" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

