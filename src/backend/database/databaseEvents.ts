export const collectionEvents = new EventTarget();

export const emitCollectionsUpdated = () => {
  collectionEvents.dispatchEvent(new Event("updated"));
};

export const onCollectionsUpdated = (callback: () => void) => {
  collectionEvents.addEventListener("updated", callback);
};

export const offCollectionsUpdated = (callback: () => void) => {
  collectionEvents.removeEventListener("updated", callback);
};

const trackEvents = new EventTarget();

export function emitTracksUpdated() {
  trackEvents.dispatchEvent(new Event("updated"));
}

export function onTracksUpdated(callback: () => void) {
  trackEvents.addEventListener("updated", callback);
}

export function offTracksUpdated(callback: () => void) {
  trackEvents.removeEventListener("updated", callback);
}


