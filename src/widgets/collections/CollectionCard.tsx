import "./CollectionCard.css";

export function CollectionCard() {
    return (
        <div className="collection-card">
            <img className="collection-image" src="collection_placeholder.jpg" />
            <div className="collection-info">
                <div className="collection-title">Collection Title</div>
                <div className="collection-description">This is a brief description of the collection.</div>
            </div>
        </div>
    );
}