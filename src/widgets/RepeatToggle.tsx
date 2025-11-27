import { useState } from "preact/hooks";
import "./RepeatToggle.css"
import { audioController } from "../backend/audio-player/AudioController";
import LoopIcon from '@mui/icons-material/Loop';
import clsx from "clsx";

export function RepeatToggle() {
  let [isRepeat, setIsRepeat] = useState<boolean>();

  return (
    <div className={clsx("repeat-toggle", {"repeat": isRepeat})}
      onClick={() => {
        setIsRepeat(!isRepeat);
      }}>
      {isRepeat ?
        <div onClick={() => { audioController.setRepeat(false) }}>
          <LoopIcon />
        </div>
        :
        <div onClick={() => { audioController.setRepeat(true) }}>
          <LoopIcon />
        </div>
      }
    </div>
  );
}