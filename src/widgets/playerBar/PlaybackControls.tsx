import "./PlaybackControls.css";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton, Slider } from "@mui/material";
import { audioController } from "../../backend/audio-player/AudioController";
import { useEffect, useState } from "preact/hooks";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function PlaybackControls() {

  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleDuration = () => setDuration(audioController.getDuration());
    const handleCurrentTime = () => setCurrentTime(audioController.getCurrentTime());

    audioController.on("play", () => setIsPlaying(true));
    audioController.on("pause", () => setIsPlaying(false));
    audioController.on("trackChange", () => handleDuration());
    audioController.on("timeUpdate", () => handleCurrentTime());

    return () => {
      audioController.off("play", () => setIsPlaying(true));
      audioController.off("pause", () => setIsPlaying(false));
      audioController.off("trackChange", () => handleDuration);
      audioController.off("timeUpdate", () => handleCurrentTime);
    };
  }, []);

  return (
    <div className="playback-controls">
      <div className="playback-controls-buttons">
        <IconButton className="playback-control-previous"
          onClick={() => audioController.previous()}>
          <KeyboardDoubleArrowLeftIcon
            className="playback-control-previous-icon" />
        </IconButton>
        {(isPlaying ?
          <IconButton className="playback-control-pause"
            onClick={() => audioController.pause()}>
            <PauseIcon
              className="playback-control-pause-icon" />
          </IconButton> :
          <IconButton className="playback-control-pause"
            onClick={() => audioController.play()}>
            <PlayArrowIcon
              className="playback-control-pause-icon" />
          </IconButton>
        )
        }
        <IconButton className="playback-control-next"
          onClick={() => audioController.next()}>
          <KeyboardDoubleArrowRightIcon
            className="playback-control-next-icon" />
        </IconButton>
      </div>
      <div className="playback-timeline">
        <p className="playback-timeline-current-time">
          {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
        </p>
        <Slider
          className="playback-timeline-slider"
          defaultValue={0}
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={(_, value) => {
            audioController.seek(value as number);
          }}
        />
        <p className="playback-timeline-track-time">
          {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}