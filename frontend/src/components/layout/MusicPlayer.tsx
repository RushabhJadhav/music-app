import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCurrentTrack, selectIsPlaying, togglePlay, nextTrack, previousTrack } from "../../store/slices/musicPlayer/musicPlayerSlice";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const MusicPlayer = () => {
    const dispatch = useAppDispatch();
    const currentTrack = useAppSelector(selectCurrentTrack);
    const isPlaying = useAppSelector(selectIsPlaying);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error("Playback failed", err));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    if (!currentTrack) {
        return (
            <div className="border-t-2 col-span-12 row-span-2 flex items-center justify-center bg-gray-800 text-white">
                <p>No track selected</p>
            </div>
        );
    }

    return (
        <div className="border-t-2 col-span-12 row-span-2 flex items-center justify-between px-8 bg-gray-800 text-white">
            <div className="flex items-center gap-4 w-1/3">
                <img 
                    src={currentTrack.image[1]?.url || currentTrack.image[0]?.url} 
                    alt={currentTrack.name} 
                    className="w-14 h-14 rounded-md object-cover"
                />
                <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold truncate" dangerouslySetInnerHTML={{ __html: currentTrack.name }} />
                    <span className="text-sm text-gray-400 truncate">
                        {currentTrack.artists.primary.map((a: any) => a.name).join(', ')}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-1/3">
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
                {/* Audio Element (Hidden) */}
                <audio 
                    ref={audioRef}
                    autoPlay={isPlaying}
                    src={currentTrack.downloadUrl[4]?.url || currentTrack.downloadUrl[0]?.url}
                    onEnded={() => dispatch(nextTrack())}
                />
            </div>

            <div className="w-1/3 flex justify-end">
                {/* Volume controls could go here */}
            </div>
        </div>
    )
}

export default MusicPlayer;