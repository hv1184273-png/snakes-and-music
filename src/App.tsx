/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { TrackPlaylist, PlayerControls } from './components/MusicPlayer';
import { DUMMY_TRACKS } from './constants';
import { Activity, Zap, Shield, Cpu } from 'lucide-react';

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-bento-bg text-white selection:bg-neon-cyan selection:text-black">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />

      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-bento-border bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <div className="font-black text-xl tracking-[4px] text-neon-cyan neon-text-cyan flex items-center gap-2 uppercase">
            <Cpu size={24} /> Synth-Snake
          </div>
        </div>
        <div className="hidden md:flex gap-8 items-center text-[11px] font-mono text-white/40 tracking-wider">
          <div className="flex gap-2 items-center">
            <Shield size={14} className="text-neon-cyan" /> SYSTEM STATUS: OPTIMAL
          </div>
          <div className="flex gap-2 items-center">
            <Activity size={14} className="text-neon-magenta" /> 60 FPS
          </div>
          <div className="flex gap-2 items-center">
            <Zap size={14} className="text-neon-green" /> LATENCY 4MS
          </div>
        </div>
        <div className="font-mono text-xs text-white/60 tracking-widest uppercase">
          USER: NEON_DRIFTER_88
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 p-5 overflow-hidden">
        {/* Left: Playlist */}
        <div className="bento-card h-full">
          <TrackPlaylist 
            tracks={DUMMY_TRACKS} 
            currentTrackId={currentTrack.id}
            onSelect={(idx) => {
              setCurrentTrackIndex(idx);
              setIsPlaying(true);
              setTimeout(() => audioRef.current?.play(), 100);
            }} 
          />
          <div className="mt-auto pt-6 opacity-30">
            <div className="text-[10px] uppercase tracking-[2px] font-mono mb-2">Audio Logic</div>
            <div className="flex gap-0.5 h-8 items-end">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 bg-neon-cyan rounded-t-sm`}
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center: Game */}
        <div className="bento-card game-window flex flex-col items-center justify-center border-[#333] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
          <SnakeGame />
        </div>

        {/* Right: Performance */}
        <div className="bento-card h-full">
          <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6">Performance</h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-white/40 uppercase">Current Combo</span>
              <span className="text-neon-magenta text-xl font-bold italic">x4.5</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-white/40 uppercase">Highest Score</span>
              <span className="text-white text-sm">012,850</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-white/40 uppercase">Game Speed</span>
              <span className="text-white text-sm">1.2x</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-white/40 uppercase">Difficulty</span>
              <span className="text-white text-sm">EXPERT</span>
            </div>
          </div>

          <div className="mt-auto border-t border-bento-border pt-5">
            <p className="text-xs text-white/40 leading-relaxed italic">
              Eat the magenta nodes to increase the music tempo and multiplier. System remains in high-sync mode.
            </p>
          </div>
        </div>
      </main>

      {/* Music Bar */}
      <footer className="h-[100px] bg-[#0a0a0a] border-t border-bento-border px-10 flex items-center">
        <PlayerControls 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          onToggle={togglePlay}
          onSkip={skipForward}
          onPrev={skipBack}
        />
      </footer>
    </div>
  );
}
