import { Card, CardModel } from "../../Model";
import React, { useState } from "react";
import { NewOrReplaceOverlay } from "../../Window/Overlay/NewOrReplaceOverlay";
import {
    Overlay,
    WindowContents,
    WindowTypes,
} from "../../Window/WindowManager";
import { WindowActions } from "../../Window/WindowActions";

export const GetSearchComponent = (
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>
) => {
    const [previewCard, setPreviewCard] = useState(null);
    let preview = <div />;
    if (previewCard !== null) {
        preview = GetPreviewDisplay(
            previewCard,
            windowActions,
            setWindows,
            setOverlay
        );
    }
    const searchItems = CardModel.map((c: Card, i: number) =>
        GetSearchResult(c, setPreviewCard, i)
    );
    return (
        <div>
            <h2>Search</h2>
            <ul> {searchItems} </ul>
            {preview}
        </div>
    );
};

const GetPreviewDisplay = (
    card: Card,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>
) => {
    if (card === null) {
        return <div />;
    }
    return (
        <div>
            <a
                onClick={() => {
                    const candidateWindow: WindowContents = {
                        id: 1,
                        type: WindowTypes.Editor,
                        card: card,
                    };
                    const overlay: Overlay = NewOrReplaceOverlay(
                        candidateWindow,
                        windowActions,
                        setWindows,
                        setOverlay
                    );
                    setOverlay(overlay);
                }}
            >
                {card.content.content}
            </a>
        </div>
    );
};

const GetSearchResult = (
    card: Card,
    setPreviewCard: React.Dispatch<any>,
    key: number
) => {
    if (card === null) {
        return <li>Null Card</li>;
    }

    return (
        <li key={key}>
            <a
                onClick={() => setPreviewCard(card)}
            >{`${card.id} ${card.type}`}</a>
        </li>
    );
};
