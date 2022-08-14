import React from "react";
import { Card } from "../../Core/Model";

export class SearchActions {
    previewCard: Card;
    setter: React.Dispatch<any>;

    constructor(previewCard: Card, setter: React.Dispatch<any>) {
        this.previewCard = previewCard;
        this.setter = setter;
    }

    setPreview(candidateCard: Card) {
        this.setter(candidateCard);
    }

    removePreview() {
        this.setter(null);
    }
}
