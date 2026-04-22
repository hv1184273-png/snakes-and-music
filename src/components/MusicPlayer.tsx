/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Track } from '../constants';

interface PlaylistProps {
  tracks: Track[];
  currentTrackId: string;
  onSelect: (index: number) => void;
}

export function TrackPlaylist({ tracks, currentTrackId, onSelect }: PlaylistProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4 px-1">Playlist</h3>
      {tracks.map((track, i) => (
        <button
          key={track.id}
          onClick={() => onSelect(i)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
            currentTrackId === track.id 
              ? 'bg-neon-cyan/10 border-neon-cyan/30' 
              : 'bg-white/3 border-transparent hover:bg-white/5'
          }`}
        >
          <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
          <div className="text-left overflow-hidden">
            <h4 className="text-sm font-bold truncate">{track.title}</h4>
            <p className="text-[10px] text-white/40 font-mono truncate">{track.artist}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

interface PlayerControlsProps {
  currentTrack: Track;
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
  onSkip: () => void;
  onPrev: () => void;
}

export function PlayerControls({ currentTrack, isPlaying, progress, onToggle, onSkip, onPrev }: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-10 w-full">
      <div className="flex items-center gap-4">
        <button onClick={onPrev} className="w-10 h-10 rounded-full border border-bento-border flex items-center justify-center hover:bg-white/5 transition-colors">
          <SkipBack size={18} />
        </button>
        <button 
          onClick={onToggle}
          className="w-12 h-12 rounded-full bg-neon-cyan text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,243,255,0.3)]"
        >
          {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
        </button>
        <button onClick={onSkip} className="w-10 h-10 rounded-full border border-bento-border flex items-center justify-center hover:bg-white/5 transition-colors">
          <SkipForward size={18} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-sm font-bold">{currentTrack.title}</span>
            <span className="text-xs text-white/40 ml-3">/ {currentTrack.artist}</span>
          </div>
          <div className="font-mono text-[10px] text-white/40">
            <span>01:12</span> / <span>03:45</span>
          </div>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 w-32">
        <Volume2 size={14} className="text-white/40" />
        <div className="h-1 flex-1 bg-white/10 rounded-full">
          <div className="w-3/4 h-full bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
