import { Button } from "@/components/ui/button"

interface TimerControlsProps {
  isActive: boolean
  toggleTimer: () => void
  resetTimer: () => void
}

export default function TimerControls({ isActive, toggleTimer, resetTimer }: TimerControlsProps) {
  return (
    <div className="flex space-x-4">
      <Button
        onClick={toggleTimer}
        className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${
          isActive
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button
        onClick={resetTimer}
        className="px-6 py-2 rounded-full text-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
      >
        Reset
      </Button>
    </div>
  )
}

