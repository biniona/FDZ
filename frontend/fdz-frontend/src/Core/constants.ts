export const ZETTL_DIR_NAME: string = "zettl";
export const NOTE_DIR_NAME: string = "note";
export const BIB_DIR_NAME: string = "bib";
export const SCRATCH_DIR_NAME: string = "scratch";
export const ZETTL_STRUCTURE = {
    root: ZETTL_DIR_NAME,
    bib: `${ZETTL_DIR_NAME}/${BIB_DIR_NAME}`,
    note: `${ZETTL_DIR_NAME}/${NOTE_DIR_NAME}`,
    scratch: `${ZETTL_DIR_NAME}/${SCRATCH_DIR_NAME}`,
};

export const TEST_DIR: string = ".test";

export const PATH_GET_NOTES = "/get-notes";
export const PATH_SAVE = "/save";
export const PATH_SAVE_PARAM_FILE_PATH = "filePath";
export const PATH_SAVE_PARAM_CONTENT = "content";
