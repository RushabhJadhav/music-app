import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { 
    selectCurrentTrack, 
    selectIsPlaying, 
    togglePlay, 
    nextTrack, 
    previousTrack 
} from "../../store/slices/musicPlayer/musicPlayerSlice";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
    const dispatch = useAppDispatch();
    const currentTrack = useAppSelector(selectCurrentTrack);
    const isPlaying = useAppSelector(selectIsPlaying);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error("Playback failed", err));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    if (!currentTrack) {
        return (
            <div className="border-t-2 col-span-12 row-span-2 flex items-center justify-center bg-gray-800 text-white">
                <p>No track selected</p>
            </div>
        );
    }

    return (
        <div className="border-t-2 col-span-12 row-span-2 flex flex-col px-8 bg-gray-800 text-white justify-center">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 w-1/3 overflow-hidden">
                    <img 
                        src={currentTrack.image[1]?.url || currentTrack.image[0]?.url} 
                        alt={currentTrack.name} 
                        className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold truncate" dangerouslySetInnerHTML={{ __html: currentTrack.name }} />
                        <span className="text-sm text-gray-400 truncate">
                            {currentTrack.artists.primary.map((a: any) => a.name).join(', ')}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 w-1/3">
                    <div className="flex items-center gap-6">
                        <SkipBack 
                            className="cursor-pointer hover:text-gray-300" 
                            onClick={() => dispatch(previousTrack())}
                        />
                        <div 
                            className="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-gray-200"
                            onClick={() => dispatch(togglePlay())}
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} fill="black" />}
                        </div>
                        <SkipForward 
                            className="cursor-pointer hover:text-gray-300" 
                            onClick={() => dispatch(nextTrack())}
                        />
                    </div>
                </div>

                <div className="w-1/3 flex justify-end">
                    {/* Volume controls could go here */}
                </div>
            </div>

            {/* Progress Bar Area */}
            <div className="flex items-center gap-3 w-full max-w-2xl mx-auto mt-2">
                <span className="text-[10px] text-gray-400 w-8 text-right">{formatTime(currentTime)}</span>
                <input 
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-300 transition-all"
                />
                <span className="text-[10px] text-gray-400 w-8">{formatTime(duration)}</span>
            </div>

            {/* Audio Element (Hidden) */}
            <audio 
                ref={audioRef}
                src={currentTrack.downloadUrl[4]?.url || currentTrack.downloadUrl[0]?.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => dispatch(nextTrack())}
            />
        </div>
    )
}

export default MusicPlayer;