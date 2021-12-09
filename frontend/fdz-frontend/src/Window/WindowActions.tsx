import React from "react";
import { WindowContents } from "./WindowManager";
import _ from "lodash";

export class WindowActions {
    windows: WindowContents[];

    constructor(windows: WindowContents[]) {
        this.windows = windows;
    }

    appendWindow(w: WindowContents) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy.push(w);
        return windowCopy;
    }

    replaceWindow(i: number, w: WindowContents) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy[i] = w;
        return windowCopy;
    }

    removeWindow(i: number) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy.splice(i, 1);
        return windowCopy;
    }
}
