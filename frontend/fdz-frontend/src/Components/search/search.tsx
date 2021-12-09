import { Card, CardModel } from "../../Model";
import React, { useState } from "react";

export const GetSearchComponent = () => {
    const [previewCard, setPreviewCard] = useState(null);
    let preview = <div />;
    if (previewCard !== null) {
        preview = GetPreviewDisplay(previewCard);
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

const GetPreviewDisplay = (card: Card) => {
    if (card === null) {
        return <div />;
    }
    return (
        <div>
            <p>{card.content.content}</p>
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