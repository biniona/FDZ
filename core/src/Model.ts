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

const testCard1: Card = {
    id: "test card 1 ",
    type: CardTypes.Note,
    content: {
        title: "1.2.3",
        content: "hello friend",
    },
};

const testCard2: Card = {
    id: "test card 2 ",
    type: CardTypes.Note,
    content: {
        title: "4.5.6",
        content: "hola amigo",
    },
};

export const CardModel: Cards = [testCard1, testCard2, testCard1, testCard2];
