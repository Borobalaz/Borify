import "./PlaybackControls.css";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton, Slider } from "@mui/material";
import { audioController } from "../../backend/audio-player/AudioController";
import { useEffect, useState } from "preact/hooks";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function PlaybackControls() {

  const [isPlaying, setIsPlaying] = useState(false);
  //const [current, setCurrent] = useState(audioController.getCurrentTrack());
  const [volume, setVolume] = useState(audioController.getVolume());

  useEffect(() => {
    audioController.on("play", () => setIsPlaying(true));
    audioController.on("pause", () => setIsPlaying(false));
    //audioController.on("trackChange", () => setCurrent(audioController.getCurrentTrack()));
  }, []);

  return (
    <div className="playback-controls">
      <div className="playback-controls-buttons">
        <IconButton className="playback-control-previous">
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
        <IconButton className="playback-control-next">
          <KeyboardDoubleArrowRightIcon
            className="playback-control-next-icon" />
        </IconButton>
      </div>
      <div className="playback-timeline">
        <p className="playback-timeline-current-time">
          0:00
        </p>
        <Slider
          className="playback-timeline-slider"
          defaultValue={0.5}
           />
        <p className="playback-timeline-track-time">
          3:45
        </p>
      </div>
    </div>
  );
}