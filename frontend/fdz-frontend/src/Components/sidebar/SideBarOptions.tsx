import { NewOrReplaceOverlay } from "../../Window/Overlay/NewOrReplaceOverlay";
import { RemoveOverlay } from "../../Window/Overlay/RemoveOverlay";
import { WindowActions } from "../../Window/WindowActions";
import {
    Overlay,
    WindowContents,
    WindowTypes,
} from "../../Window/WindowManager";

export const NewOrReplaceEditor = (
    overlay: Overlay,
    setOverlay: React.Dispatch<any>,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>
) => (
    <a
        onClick={() => {
            if (overlay === null) {
                setOverlay(
                    NewOrReplaceOverlay(
                        defaultEditor,
                        windowActions,
                        setWindows,
                        setOverlay
                    )
                );
            } else {
                setOverlay(null);
            }
        }}
    >
        Add Editor
    </a>
);

export const NewOrReplaceSearch = (
    overlay: Overlay,
    setOverlay: React.Dispatch<any>,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>
) => (
    <a
        onClick={() => {
            if (overlay === null) {
                setOverlay(
                    NewOrReplaceOverlay(
                        defaultSearch,
                        windowActions,
                        setWindows,
                        setOverlay
                    )
                );
            } else {
                setOverlay(null);
            }
        }}
    >
        Add Search
    </a>
);

export const RemoveWindow = (
    overlay: Overlay,
    setOverlay: React.Dispatch<any>,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>
) => (
    <a
        onClick={() => {
            if (overlay === null) {
                setOverlay(
                    RemoveOverlay(windowActions, setWindows, setOverlay)
                );
            } else {
                setOverlay(null);
            }
        }}
    >
        Remove Window
    </a>
);

const defaultEditor: WindowContents = {
    id: "default_editor",
    type: WindowTypes.Editor,
    card: null,
};

const defaultSearch: WindowContents = {
    id: "default_window",
    type: WindowTypes.Search,
    card: null,
};
