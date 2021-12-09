import React from "react";
import { WindowContents } from "./WindowManager";
import _ from "lodash";

export class WindowActions {
    windows: WindowContents[];
    setter: React.Dispatch<any>;

    constructor(windows: WindowContents[], setter: React.Dispatch<any>) {
        this.windows = _.cloneDeep(windows);
        this.setter = setter;
        console.log("New Actions", _.cloneDeep(this.windows));
    }

    appendWindow(w: WindowContents) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy.push(w);
        this.setter(windowCopy);
    }

    replaceWindow(i: number, w: WindowContents) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy[i] = w;
        this.setter(windowCopy);
    }

    removeWindow(i: number) {
        let windowCopy = _.cloneDeep(this.windows);
        windowCopy.splice(i, 1);
        this.setter(windowCopy);
    }
}
