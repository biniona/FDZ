import { Card, Cards } from "../../Core/Model";
import React, { useState } from "react";
import { NewOrReplaceOverlay } from "../../Window/Overlay/NewOrReplaceOverlay";
import {
    Dimensions,
    ConvertDimensionsToPercent,
    DimensionsPercents,
} from "../../Window/LucasNumber";
import {
    Overlay,
    WindowContents,
    WindowTypes,
} from "../../Window/WindowManager";
import { WindowActions } from "../../Window/WindowActions";

export const GetSearchComponent = (
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>,
    cards: Cards,
    dimensions: Dimensions
) => {
    const [previewCard, setPreviewCard] = useState(null);
    let preview = <div />;
    if (previewCard !== null) {
        preview = GetPreviewDisplay(
            previewCard,
            windowActions,
            setWindows,
            setOverlay,
            dimensions
        );
    }
    const searchItems = cards.map((c: Card, i: number) =>
        GetSearchResult(c, setPreviewCard, i)
    );
    return (
        <div>
            <h2>Search</h2>
            <ul style={{ width: "20%", float: "left" }}> {searchItems} </ul>
            {preview}
        </div>
    );
};

const GetPreviewDisplay = (
    card: Card,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>,
    dimensions: Dimensions
) => {
    if (card === null) {
        return <div />;
    }
    const percentage: DimensionsPercents = ConvertDimensionsToPercent(
        getFixedPosition(dimensions, 0.3, 0.6, 0.3, 0.6)
    );
    return (
        <div style={{ position: "fixed", ...percentage }}>
            <a
                onClick={() => {
                    const candidateWindow: WindowContents = {
                        id: card.filePath,
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
            >{`${card.content.title} ${card.type}`}</a>
        </li>
    );
};

const getFixedPosition = (
    dimensions: Dimensions,
    top: number,
    left: number,
    width: number,
    height: number
): Dimensions => ({
    left: dimensions.left + dimensions.width * left,
    top: dimensions.top + dimensions.height * top,
    width: dimensions.width * width,
    height: dimensions.height * height,
});
