import "./TracksHeader.css";

export function TracksHeader() {
    return (
        <div className="tracks-header">
            <img className="tracks-header-image" src="collection_placeholder.jpg" />
            <div className="tracks-header-info">
                <div className="tracks-header-label">PLAYLIST</div>
                <div className="tracks-header-title">My Favorite Tracks</div>
                <div className="tracks-header-description">A collection of my all-time favorite songs.</div>
            </div>
        </div>
    );
}