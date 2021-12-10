interface Content {
    content: String;
}

export interface Note extends Content {
    title: String;
}

export interface Bib extends Content {
    title: String;
}

export interface Scratch extends Content {
    title: String;
}

export enum CardTypes {
    Note = "Note",
    Scratch = "Scratch",
    Bib = "Bib",
}

export type Card = {
    id: String;
    type: CardTypes;
    content: Note | Bib | Scratch;
} | null;

export type Cards = Array<Card>;