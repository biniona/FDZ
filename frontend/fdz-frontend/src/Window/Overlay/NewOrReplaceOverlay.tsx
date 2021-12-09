import { WindowContents, WindowTypes } from "../WindowManager";
import { WindowActions } from "../WindowActions";
import { GetDimensions } from "../LucasNumber";
import React from "react";

export const NewOrReplaceOverlay = (
    newWindow: WindowContents,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>
) => {
    const numWindows = windowActions.windows.length + 1;
    const windowRange = Array.from({ length: numWindows }, (x, i) => i);
    return (
        <div id="WindowOverlay">
            {windowRange.map((i) => {
                let changeButton = replaceButton(() => {
                    setWindows(windowActions.replaceWindow(i, newWindow));
                    setOverlay(null);
                });
                if (i === windowRange.length - 1) {
                    changeButton = addButton(() => {
                        setWindows(windowActions.appendWindow(newWindow));
                        setOverlay(null);
                    });
                }
                return (
                    <div key={`overlay-${i}`}>
                        <div
                            className="OverlayPane"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                zIndex: 1,
                                border: "dashed navy",
                                position: "absolute",
                                overflow: "auto",
                                ...GetDimensions(i, numWindows),
                            }}
                        >
                            {changeButton}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const replaceButton = (onClick: React.Dispatch<any>) => (
    <a onClick={onClick}>Replace</a>
);
const addButton = (onClick: React.Dispatch<any>) => (
    <a onClick={onClick}>Add</a>
);
