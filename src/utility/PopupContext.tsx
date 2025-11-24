import { createContext } from "preact";
import { useContext } from "preact/hooks";

export const PopupContext = createContext({
  show: (content: any) => {},
  hide: () => {}
});

export const usePopup = () => useContext(PopupContext);
