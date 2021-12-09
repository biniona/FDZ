import { WindowContents, WindowTypes } from "../WindowManager";
import { WindowActions } from "../WindowActions";
import { GetDimensions } from "../LucasNumber";

export const NewOrReplaceOverlay = (
    windowContent: WindowContents,
    windowActions: WindowActions
) => {
    const numWindows = windowActions.windows.length + 1;
    const windowRange = Array.from({ length: numWindows }, (x, i) => i);
    return (
        <div id="WindowOverlay">
            {windowRange.map((i) => {
                const replaceButton = (
                    <a
                        onClick={() => {
                            windowActions.replaceWindow(i, windowContent);
                        }}
                    >
                        Replace
                    </a>
                );
                const addButton = (
                    <a
                        onClick={() =>
                            windowActions.appendWindow(windowContent)
                        }
                    >
                        Add
                    </a>
                );
                let changeButton = replaceButton;
                if (i === windowRange.length - 1) {
                    changeButton = addButton;
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
