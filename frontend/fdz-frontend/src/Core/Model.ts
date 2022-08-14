interface Content {
    content: string;
}

export interface Note extends Content {
    title: string;
}

export interface Bib extends Content {
    title: string;
}

export interface Scratch extends Content {
    title: string;
}
export enum CardTypes {
    Note = "Note",
    Scratch = "Scratch",
    Bib = "Bib",
    Empty = "Empty",
}
export const NONEMPTY_CARD_TYPES_ARR = Object.values(CardTypes).filter((t) => {
    if (t === CardTypes.Empty) {
        return false;
    }
    return true;
});

export type nullableCard = {
    filePath: string;
    type: CardTypes;
    content: Note | Bib | Scratch;
} | null;

export type Card = {
    filePath: string;
    type: CardTypes;
    content: Note | Bib | Scratch;
};

export type Cards = Card[];
