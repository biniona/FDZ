import fs from "fs";
import path from "path";
import { CardPayload, Cards, CardTypes } from "./Core/Model.js";
import {
    NOTE_DIR_NAME,
    BIB_DIR_NAME,
    SCRATCH_DIR_NAME,
} from "./Core/constants.js";

type dirInformation = {
    content: string;
    fileName: string;
};

export default async (zettlPath: string) => {
    const notes = readDirToArray(
        path.join(zettlPath, NOTE_DIR_NAME),
        NOTE_DIR_NAME
    );
    const bibs = readDirToArray(
        path.join(zettlPath, BIB_DIR_NAME),
        BIB_DIR_NAME
    );
    const scratches = readDirToArray(
        path.join(zettlPath, SCRATCH_DIR_NAME),
        SCRATCH_DIR_NAME
    );

    const notesArr = await asyncArrToCards(notes, CardTypes.Note);
    const bibsArr = await asyncArrToCards(bibs, CardTypes.Bib);
    const scratchesArr = await asyncArrToCards(scratches, CardTypes.Scratch);

    const allCards: CardPayload = {
        [CardTypes.Bib]: bibsArr,
        [CardTypes.Note]: notesArr,
        [CardTypes.Scratch]: scratchesArr,
        [CardTypes.Empty]: [],
    };

    return allCards;
};

const asyncArrToCards = async (
    arrPromise: Promise<dirInformation[]>,
    cardType: CardTypes
) => {
    const cards: Cards = [];
    let i = 0;
    const arr = await arrPromise;
    for (const content of arr) {
        cards.push({
            filePath: content.fileName,
            type: cardType,
            content: {
                content: content.content,
                title: path.parse(content.fileName).name,
            },
        });
        i += 1;
    }
    return cards;
};

const readDirToArray = async (destination: string, dirName: string) => {
    const dirContent: dirInformation[] = [];
    try {
        const files = await fs.promises.readdir(destination);
        for (const file of files) {
            const filePath = path.join(destination, file);
            // Stat the file to see if we have a file or dir
            const stat = await fs.promises.stat(filePath);
            if (stat.isDirectory()) {
                console.log("'%s' is a directory.", filePath);
                continue;
            }
            const text = fs.readFileSync(filePath, "utf-8");
            const fileInfo: dirInformation = {
                content: text,
                fileName: path.join(dirName, file),
            };
            dirContent.push(fileInfo);
        }
    } catch (e) {
        console.error("Error: ", e);
    }
    return dirContent;
};
