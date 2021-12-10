import fs from "fs";
import path from "path";
import { Cards, CardTypes } from "./Model.js";
import { NOTE_DIR_NAME, BIB_DIR_NAME, SCRATCH_DIR_NAME } from "./constants.js";

type dirInformation = {
    content: string;
    fileName: string;
};

export default async (zettlPath: string) => {
    const notes = readDirToArray(path.join(zettlPath, NOTE_DIR_NAME));
    const bibs = readDirToArray(path.join(zettlPath, BIB_DIR_NAME));
    const scratches = readDirToArray(path.join(zettlPath, SCRATCH_DIR_NAME));

    const notesArr = asyncArrToCards(notes, CardTypes.Note);
    const bibsArr = asyncArrToCards(bibs, CardTypes.Bib);
    const scratchesArr = asyncArrToCards(scratches, CardTypes.Scratch);

    const allCards: Cards = (await notesArr)
        .concat(await bibsArr)
        .concat(await scratchesArr);
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
            id: `${i}_${cardType}`,
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

const readDirToArray = async (destination: string) => {
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
                fileName: file,
            };
            dirContent.push(fileInfo);
        }
    } catch (e) {
        console.error("Error: ", e);
    }
    return dirContent;
};
