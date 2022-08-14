import z2j from "./zettlToJson";
import fs from "fs";
import { CardTypes } from "../Core/Model";
import { ZETTL_STRUCTURE, TEST_DIR } from "../Core/constants";

beforeEach(() => {
    createTestDir();
});

afterEach(() => {
    removeTestDir();
});

test("test that files are added to notes array", () => {
    return z2j(`./${TEST_DIR}/${ZETTL_STRUCTURE.root}`).then((data) => {
        expect(data[0]).toStrictEqual({
            id: "0_Note",
            type: CardTypes.Note,
            content: {
                content: "hello",
                title: "test_note",
            },
        });
        expect(data[1]).toStrictEqual({
            id: "0_Bib",
            type: CardTypes.Bib,
            content: {
                content: "bib test",
                title: "test_bib",
            },
        });
    });
});

const createTestDir = () => {
    fs.mkdirSync(`./${TEST_DIR}`);
    for (const p of Object.values(ZETTL_STRUCTURE)) {
        fs.mkdirSync(`./${TEST_DIR}/${p}`);
    }
    fs.writeFileSync(
        `./${TEST_DIR}/${ZETTL_STRUCTURE.note}/test_note.md`,
        "hello"
    );
    fs.writeFileSync(
        `./${TEST_DIR}/${ZETTL_STRUCTURE.bib}/test_bib.md`,
        "bib test"
    );
};

const removeTestDir = () => {
    fs.rmdirSync(`./${TEST_DIR}`, {
        recursive: true,
    });
};
