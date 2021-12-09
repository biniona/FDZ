interface Content {
    content: String;
}

interface Note extends Content {
    title: String;
}

interface Bib extends Content {
    title: String;
}

interface Scratch extends Content {}

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

const testCard: Card = {
    id: "test card",
    type: CardTypes.Note,
    content: {
        title: "1.2.3",
        content: "hello friend",
    },
};

export const CardModel: Cards = [
    testCard,
    testCard,
    testCard,
    testCard,
    testCard,
    testCard,
];
