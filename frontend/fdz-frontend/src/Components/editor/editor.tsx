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
                return loadNote(card.id, card.content.content);
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

const getNewNote = () => (
    <EditorWrapper id="default-note-editor" content={noteTmpl} />
);

const getNewBib = () => (
    <EditorWrapper id="default-bib-editor" content={bibTmpl} />
);

const getNewScratch = () => (
    <EditorWrapper
        id="default-scratch-editor"
        content="Write whatever you want!"
    />
);

const loadNote = (id: string, content: string) => (
    <EditorWrapper id={id} content={content} />
);

const EditorWrapper = ({ id, content }: { id: string; content: string }) => (
    <div id={id}>
        <p>{id}</p>
        <Editor value={content} />
    </div>
);
