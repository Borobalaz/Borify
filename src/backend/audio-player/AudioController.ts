import { track } from "framer-motion/client";
import { TrackDTO } from "../database/DTOs";

type Listener = () => void;

class AudioController {

  private audio = new Audio();
  private queue: TrackDTO[] = [];
  private currentIndex = -1;
  private currentTrack: TrackDTO;

  // Event subscribers
  private listeners = {
    play: [] as Listener[],
    pause: [] as Listener[],
    trackChange: [] as Listener[],
    queueUpdate: [] as Listener[],
    ended: [] as Listener[],
    timeUpdate: [] as Listener[]
  };

  constructor() {
    // Emit time update events
    this.audio.addEventListener("timeupdate", () => {
      this.notify("timeUpdate");
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.notify("trackChange");
    });

    // Automatically advance to the next track
    this.audio.addEventListener("ended", () => {
      this.notify("ended");
      this.next();
    });
  }

  // -----------------------
  // PLAYBACK CONTROL
  // -----------------------

  async play(track?: TrackDTO) {
    if (track) {
      this.audio.src = URL.createObjectURL(track.audio);
      this.currentTrack = track;
      this.currentIndex = -1;
    }
    if (!this.audio.src) {
      console.warn("AudioController.play(): No audio source loaded.");
      return;
    }

    // Resume current audio if paused
    this.audio.play();
    this.notify("play");
  }

  pause() {
    this.audio?.pause();
    this.notify("pause");
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  setVolume(volume: number) {
    if (this.audio) this.audio.volume = Math.min(Math.max(volume, 0), 1);
  }

  getVolume() {
    return this.audio?.volume ?? 1;
  }

  seek(seconds: number) {
    this.audio.currentTime = seconds;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  onEnded(callback: () => void) {
    if (this.audio) this.audio.onended = callback;
  }

  isPlaying() {
    return this.audio && !this.audio.paused;
  }

  // -----------------------
  // EVENTS
  // -----------------------

  on(event: keyof typeof this.listeners, cb: Listener) {
    this.listeners[event].push(cb);
  }

  private async notify(event: keyof typeof this.listeners) {
    this.listeners[event].forEach(cb => cb());
  }

  off(event: keyof typeof this.listeners, callback: Listener) {
    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback
    );
  }


  // -----------------------
  // QUEUE MANAGEMENT
  // -----------------------

  enqueue(track: TrackDTO) {
    this.queue.push(track);
    this.notify("queueUpdate");

    // If nothing playing yet, start
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
      this.loadCurrent();
      this.audio.play();
    }
  }

  setQueue(tracks: TrackDTO[]) {
    this.queue = tracks;
    this.currentIndex = tracks.length > 0 ? 0 : -1;
    this.loadCurrent();
    this.notify("queueUpdate");
  }

  next() {
    if (this.currentIndex < this.queue.length - 1) {
      this.currentIndex++;
      this.loadCurrent();
      this.audio.play();
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrent();
      this.audio.play();
    }
  }

  private loadCurrent() {
    if (this.currentIndex === -1 || !this.queue[this.currentIndex]) return;
    const track = this.queue[this.currentIndex];
    this.audio.src = URL.createObjectURL(track.audio);
    this.currentTrack = track;
  }

  getCurrentTrack(): TrackDTO {
    return this.currentTrack;
  }
}

export const audioController = new AudioController();
