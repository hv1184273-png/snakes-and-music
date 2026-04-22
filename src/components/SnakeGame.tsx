/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useSnake } from '../hooks/useSnake';
import { RefreshCw, Play as PlayIcon } from 'lucide-react';

export function SnakeGame() {
  const { snake, food, score, isGameOver, isPaused, setIsPaused, resetGame, GRID_SIZE } = useSnake();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="mb-6">
        <span className="font-mono text-5xl font-black text-neon-cyan neon-text-cyan">
          {score.toLocaleString('en-US', { minimumIntegerDigits: 6 })}
        </span>
      </div>

      <div 
        className="relative snake-grid-container rounded-sm overflow-hidden"
        style={{
          width: 'min(70vh, 400px)',
          aspectRatio: '1/1',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          background: '#000'
        }}
      >
        {/* Render Food */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 5px var(--color-neon-magenta)',
              '0 0 15px var(--color-neon-magenta)',
              '0 0 5px var(--color-neon-magenta)'
            ]
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute rounded-full bg-neon-magenta"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            zIndex: 10
          }}
        />

        {/* Render Snake */}
        {snake.map((segment, i) => (
          <div
            key={`${i}-${segment.x}-${segment.y}`}
            className="absolute rounded-[2px] bg-neon-cyan"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              boxShadow: '0 0 8px var(--color-neon-cyan)',
              zIndex: i === 0 ? 20 : 10,
              opacity: 1 - (i / snake.length) * 0.4
            }}
          />
        ))}

        {/* Overlays */}
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            {isGameOver ? (
              <div className="text-center p-8 space-y-6">
                <h2 className="text-3xl font-black text-neon-magenta uppercase tracking-tighter">System Crash</h2>
                <p className="text-white/40 font-mono text-xs">FINAL CONNECTIVITY: {score}</p>
                <button 
                  onClick={resetGame}
                  className="flex items-center gap-2 mx-auto px-8 py-3 bg-neon-cyan text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  <RefreshCw size={18} />
                  REBOOT CORE
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsPaused(false)}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-full border border-neon-cyan flex items-center justify-center group-hover:scale-110 transition-transform bg-neon-cyan/5">
                  <PlayIcon size={40} className="text-neon-cyan ml-1" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-neon-cyan/60 uppercase">Manual Override Required</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-8 text-white/30 font-mono text-[9px] uppercase tracking-widest">
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-magenta shadow-[0_0_5px_var(--color-neon-magenta)]" /> Magenta Node (Food)</span>
        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-neon-cyan shadow-[0_0_5px_var(--color-neon-cyan)]" /> Cyan Stream (Snake)</span>
      </div>
    </div>
  );
}
