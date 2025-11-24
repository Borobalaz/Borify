import { Slider } from "@mui/material";
import "./VolumeControl.css";
import { audioController } from "../../backend/audio-player/AudioController";

export function VolumeControl() {
  return (
    <div className="player-bar-volume-control">
      <Slider
        className="player-bar-volume-slider"
        defaultValue={0.5}
        min={0}
        max={1}
        step={0.01}
        onChange={(_, value) => {
          const vol = Array.isArray(value) ? value[0] : value;
          audioController.setVolume(vol);
        }} sx={{
          "& .MuiSlider-thumb": {
            borderRadius: "100px",
            width: "5px"
          }
        }} />
    </div>
  );
}