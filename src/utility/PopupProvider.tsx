import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { PopupContext }  from "./PopupContext";
import "./PopupStyle.css"

export function PopupProvider({ children }) {
  const [content, setContent] = useState(null);

  function show(node) {
    setContent(node);
  }

  function hide() {
    setContent(null);
  }

  return (
    <PopupContext.Provider value={{ show, hide }}>
      {children}

      {content &&
        createPortal(
          <div className="popup-overlay" onClick={hide}>
            <div className="popup-body" onClick={e => e.stopPropagation()}>
              {content}
            </div>
          </div>,
          document.getElementById("popup-root")
        )
      }
    </PopupContext.Provider>
  );
}
