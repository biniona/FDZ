import Editor from "rich-markdown-editor";
import { Card, CardTypes } from "../../Core/Model";
import { noteTmpl } from "./templates/note.md";
import { bibTmpl } from "./templates/bib.md";
import { saveCard } from "../../API/data";
import { getEditorSelectorForm } from "./editor-selector";

export const getEditor = (card: Card) => {
    console.log(card);
    switch (card.type) {
        case CardTypes.Note:
            if (card.content.content !== null && card.content.content !== "") {
                return loadNote(card.filePath, card.content.content);
            }
            return getNewNote(card);
        case CardTypes.Bib:
            return getNewBib(card);
        case CardTypes.Scratch:
            return getNewScratch(card);
        default:
            return getEditorSelectorForm();
    }
};

const getNewNote = (card: Card) => (
    <EditorWrapper id={card.filePath} content={noteTmpl} />
);

const getNewBib = (card: Card) => (
    <EditorWrapper id={card.filePath} content={bibTmpl} />
);

const getNewScratch = (card: Card) => (
    <EditorWrapper id={card.filePath} content="Write whatever you want!" />
);

const loadNote = (id: string, content: string) => (
    <EditorWrapper id={id} content={content} />
);

const EditorWrapper = ({ id, content }: { id: string; content: string }) => {
    return (
        <div id={id}>
            <p>{id}</p>
            <Editor
                value={content}
                onChange={(getCurrentValue) => (content = getCurrentValue())}
                onSave={() => saveCard(id, content)}
            />
        </div>
    );
};
