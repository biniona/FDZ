import { WindowContents, WindowTypes } from "../WindowManager";
import { WindowActions } from "../WindowActions";
import { GetDimensions } from "../LucasNumber";
import React from "react";

export const RemoveOverlay = (
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>
) => {
    const numWindows = windowActions.windows.length;
    const windowRange = Array.from({ length: numWindows }, (x, i) => i);
    return (
        <div id="WindowOverlay">
            {windowRange.map((i) => {
                let remove = removeButton(() => {
                    setWindows(windowActions.removeWindow(i));
                    setOverlay(null);
                });
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
                            {remove}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const removeButton = (onClick: React.Dispatch<any>) => (
    <a onClick={onClick}>Remove</a>
);
