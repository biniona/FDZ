import { NewOrReplaceOverlay } from "../../Window/Overlay/NewOrReplaceOverlay";
import { WindowActions } from "../../Window/WindowActions";
import {
    Overlay,
    WindowContents,
    WindowTypes,
} from "../../Window/WindowManager";

export const NewOrReplaceEditor = (
    overlay: Overlay,
    setOverlay: React.Dispatch<any>,
    windowActions: WindowActions
) => (
    <a
        onClick={() => {
            if (overlay === null) {
                setOverlay(NewOrReplaceOverlay(defaultEditor, windowActions));
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
    windowActions: WindowActions
) => (
    <a
        onClick={() => {
            if (overlay === null) {
                setOverlay(NewOrReplaceOverlay(defaultSearch, windowActions));
            } else {
                setOverlay(null);
            }
        }}
    >
        Add Search
    </a>
);

const defaultEditor: WindowContents = {
    id: 1,
    type: WindowTypes.Editor,
    card: null,
};

const defaultSearch: WindowContents = {
    id: 1,
    type: WindowTypes.Search,
    card: null,
};
