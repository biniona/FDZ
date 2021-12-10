import Editor from "rich-markdown-editor";
import { Card, CardTypes } from "core";
import { noteTmpl } from "./templates/note.md";
import { bibTmpl } from "./templates/bib.md";

export const getEditor = (card: Card) => {
    if (card === null) {
        return getNewNote();
    }
    switch (card.type) {
        case CardTypes.Note:
            if (card.content !== null) {
                return loadNote(String(card.content.content));
            }
            return getNewNote();
        case CardTypes.Bib:
            return getNewBib();
        case CardTypes.Scratch:
            return getNewScratch();
        default:
            return <Editor defaultValue="Write anything!" />;
    }
};

const getNewNote = () => <Editor defaultValue={noteTmpl} />;

const getNewBib = () => <Editor defaultValue={bibTmpl} />;

const getNewScratch = () => <Editor defaultValue="Write whatever you want!" />;

const loadNote = (content: string) => <Editor defaultValue={content} />;
