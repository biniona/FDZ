import React from "react";
import { WindowContents } from "./WindowManager";

export class WindowActions {
    windows: WindowContents[];
    setter: React.Dispatch<any>;

    constructor(windows: WindowContents[], setter: React.Dispatch<any>) {
        this.windows = windows;
        this.setter = setter;
    }

    appendWindow(w: WindowContents) {
        let windowCopy = cloneWindows(this.windows);
        windowCopy.push(w);
        this.setter(windowCopy);
    }

    replaceWindow(i: number, w: WindowContents) {
        let windowCopy = cloneWindows(this.windows);
        windowCopy[i] = w;
        this.setter(windowCopy);
    }

    removeWindow(i: number) {
        let windowCopy = cloneWindows(this.windows);
        windowCopy.splice(i, 1);
        this.setter(windowCopy);
    }
}

// TODO: test this
const cloneWindows = (windows: WindowContents[]) => {
    return JSON.parse(JSON.stringify(windows));
};
