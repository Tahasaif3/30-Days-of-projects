interface TimerDisplayProps {
  time: number
  isActive: boolean
}

export default function TimerDisplay({ time, isActive }: TimerDisplayProps) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <div className="text-8xl font-bold mb-8 relative">
      <div className={`transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div 
        className="absolute inset-0 border-4 border-white rounded-full animate-pulse"
        style={{
          animation: isActive ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
        }}
      ></div>
    </div>
  )
}

