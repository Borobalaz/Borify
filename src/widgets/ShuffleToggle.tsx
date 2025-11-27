import { useState } from "preact/hooks";
import "./ShuffleToggle.css"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { audioController } from "../backend/audio-player/AudioController";
import clsx from "clsx";

export function ShuffleToggle() {
  let [isShuffle, setIsShuffle] = useState<boolean>(false);

  return (
    <div className={clsx("shuffle-toggle", {"shuffled": isShuffle})}
      onClick={() => {
        setIsShuffle(!isShuffle);
      }}>
      {isShuffle ?
        <div onClick={() => { audioController.unshuffle() }}>
          <ShuffleIcon />
        </div>
        :
        <div onClick={() => { audioController.shuffle() }}>
          <ShuffleIcon />
        </div>
      }
    </div>
  );
}