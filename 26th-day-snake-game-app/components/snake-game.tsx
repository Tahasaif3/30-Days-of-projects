"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, RefreshCcwIcon } from "lucide-react";

enum GameState {
  START,
  PAUSE,
  RUNNING,
  GAME_OVER,
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface Position {
  x: number;
  y: number;
}

const initialSnake: Position[] = [{ x: 0, y: 0 }];
const initialFood: Position = { x: 5, y: 5 };

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(initialFood);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      let newHead: Position;

      switch (direction) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          return newSnake;
      }

      newSnake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case "ArrowDown":
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    },
    [direction]
  );

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      gameInterval.current = setInterval(moveSnake, 200);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameState, moveSnake, handleKeyPress]);

  const startGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
    setDirection(Direction.RIGHT);
    setGameState(GameState.RUNNING);
  };

  const pauseGame = () => {
    setGameState(
      gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
    );
  };

  const resetGame = () => {
    setGameState(GameState.START);
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center text-cyan-400 mb-6 tracking-wide">
          Snake Game
        </h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Button
            variant="default"
            size="lg"
            className="bg-green-500 hover:bg-green-600 w-20 sm:w-24"
            onClick={startGame}
          >
            <PlayIcon className="mr-2 w-5 h-5" />
            Start
          </Button>
          <Button
            variant="default"
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 w-20 sm:w-24"
            onClick={pauseGame}
          >
            <PauseIcon className="mr-2 w-5 h-5" />
            Pause
          </Button>
          <Button
            variant="default"
            size="lg"
            className="bg-red-500 hover:bg-red-600 w-20 sm:w-24"
            onClick={resetGame}
          >
            <RefreshCcwIcon className="mr-2 w-5 h-5" />
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-10 gap-1 bg-black rounded-lg p-4 mb-6">
          {Array.from({ length: 100 }).map((_, i) => {
            const x = i % 10;
            const y = Math.floor(i / 10);
            const isSnakePart = snake.some((part) => part.x === x && part.y === y);
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={i}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md ${
                  isSnakePart ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-800"
                } transition-transform duration-200`}
              />
            );
          })}
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <p className="text-lg font-bold text-cyan-400 mb-2">Game Stats</p>
          <div className="flex items-center justify-around text-sm sm:text-base">
            <div>
              <p>Score:</p>
              <span className="text-2xl font-extrabold text-green-400">{score}</span>
            </div>
            <div>
              <p>High Score:</p>
              <span className="text-2xl font-extrabold text-yellow-400">{highScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
