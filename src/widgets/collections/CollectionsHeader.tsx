import { Button, IconButton } from "@mui/material";
import "./CollectionsHeader.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface CollectionsHeaderProps {
    onCreateNewCollection?: () => void;
}

export function CollectionsHeader({onCreateNewCollection}: CollectionsHeaderProps) {
    return (
        <div className="collections-header">
            <div className="collections-header-title"> Collections </div>
            <IconButton
                className="collections-new-button"
                color="inherit"
                onClick={onCreateNewCollection}>
                <AddCircleOutlineIcon />
            </IconButton>
        </div>
    );
}