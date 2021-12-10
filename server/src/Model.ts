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
}

export type Card = {
    id: string;
    type: CardTypes;
    content: Note | Bib | Scratch;
} | null;

export type Cards = Card[];
