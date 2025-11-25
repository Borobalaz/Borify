import { useState } from "preact/hooks";
import "./ShuffleToggle.css"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import { audioController } from "../backend/audio-player/AudioController";
import { IconButton } from "@mui/material";

export function ShuffleToggle() {
  let [isShuffle, setIsShuffle] = useState<boolean>();

  return (
    <div className="shuffle-toggle"
      onClick={() => {
        setIsShuffle(!isShuffle);
      }}>
      {isShuffle ?
        <IconButton onClick={() => { audioController.unshuffle() }}>
          <ShuffleOnIcon />
        </IconButton>
        :
        <IconButton onClick={() => { audioController.shuffle() }}>
          <ShuffleIcon />
        </IconButton>
      }
    </div>
  );
}