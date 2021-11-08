/** This module defines a relative grid layout based
 * on the "Lucas Numbers" approximation of the Golden Ratio. */

const LUCAS_NUMBERS_REVERSE: number[] = [76, 47, 29, 18, 11, 7, 4, 3, 1, 2];
const BIGGEST = LUCAS_NUMBERS_REVERSE[0] + LUCAS_NUMBERS_REVERSE[1];

interface lucas_map_type {
    [index: number]: number | number[];
}

/** Map to define how different cells effect one another in layout. */
const LEFT_SHIFT_MAP: lucas_map_type = {
    0: NaN,
    1: 0,
    2: [0, 3],
    3: 0,
    4: 0,
    5: 0,
};

const TOP_SHIFT_MAP: lucas_map_type = {
    0: NaN,
    1: 2,
    2: NaN,
    3: 4,
    4: 5,
    5: NaN,
};

const LucasNumber = (index: number) => {
    return LUCAS_NUMBERS_REVERSE[index];
};

const LucasNumberScaleWidth = (lNumber: number) => {
    return lNumber / BIGGEST;
};

const LucasNumberScaleHeight = (lNumber: number) => {
    return lNumber / LUCAS_NUMBERS_REVERSE[0];
};

const GetHeight = (index: number, num_cells: number) => {
    if (index % 2 === 0 || num_cells !== index + 1) {
        return LucasNumberScaleHeight(LucasNumber(index));
    } else {
        return LucasNumberScaleHeight(LucasNumber(index - 1));
    }
};

const GetWidth = (index: number, num_cells: number) => {
    if (index % 2 !== 0 || num_cells !== index + 1) {
        return LucasNumberScaleWidth(LucasNumber(index));
    } else if (index === 0) {
        return 1;
    } else {
        return LucasNumberScaleWidth(LucasNumber(index - 1));
    }
};

const GetShiftLeft = (index: number, num_cells: number) => {
    if (index === 0) {
        return 0;
    }
    const shift_amount = LEFT_SHIFT_MAP[index];
    if (typeof shift_amount === "number") {
        return LucasNumberScaleWidth(LucasNumber(shift_amount));
    } else {
        let count: number = 0;
        shift_amount.forEach((value) => {
            if (value < num_cells) {
                count += LucasNumberScaleWidth(LucasNumber(value));
            }
        });
        return count;
    }
};

const GetShiftTop = (index: number, num_cells: number) => {
    if (index === 0) {
        return 0;
    }
    const shift_amount = TOP_SHIFT_MAP[index];
    let count: number = 0;
    if (typeof shift_amount === "number" && shift_amount !== NaN) {
        if (shift_amount < num_cells) {
            count += LucasNumberScaleHeight(LucasNumber(shift_amount));
        }
    }
    return count;
};

const p = (n: number) => `${n * 100}%`;

/** Given the number of cells and the current cell, describe the cell  */
export const GetDimensions = (index: number, count: number) => ({
    height: p(GetHeight(index, count)),
    width: p(GetWidth(index, count)),
    left: p(GetShiftLeft(index, count)),
    top: p(GetShiftTop(index, count)),
});
