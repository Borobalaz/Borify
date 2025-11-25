import "./TopBar.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import pkg from "../../package.json";

interface TopBarProps {
  onThemeChange?: () => void;
}

export function TopBar({ onThemeChange }: TopBarProps) {
  return (
    <div className="top-bar">
      <p className="top-bar-title">Borify</p>
      <p className="version-number">{pkg.version}</p>

      <div className="top-bar-buttons">
        <DarkModeIcon className="top-bar-theme-icon" onClick={onThemeChange} />

      </div>
    </div>
  );
}