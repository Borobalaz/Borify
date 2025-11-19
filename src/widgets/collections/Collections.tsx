import { CollectionCard } from "./CollectionCard";
import "./Collections.css";
import { CollectionsHeader } from "./CollectionsHeader";

interface CollectionsProps {
    onCreateNewCollection?: () => void;
}

export function Collections({ onCreateNewCollection }: CollectionsProps) {
    const collections = [
        { id: 1, title: "Collection 1" },
        { id: 2, title: "Collection 2" },
        { id: 3, title: "Collection 3" },
        { id: 4, title: "Collection 4" },
        { id: 5, title: "Collection 5" },
        { id: 6, title: "Collection 6" },
        { id: 7, title: "Collection 7" },
        { id: 2, title: "Collection 2" },
        { id: 3, title: "Collection 3" },
        { id: 4, title: "Collection 4" },
        { id: 5, title: "Collection 5" },
        { id: 6, title: "Collection 6" },
        { id: 7, title: "Collection 7" },

        // ...
    ];

    return (
        <div className="collections-widget">
            <CollectionsHeader 
                onCreateNewCollection={onCreateNewCollection}/>
            <div className="collections-list">
                {collections.map((collection) => (
                    <CollectionCard />
                ))}
            </div>
        </div>
    );
}