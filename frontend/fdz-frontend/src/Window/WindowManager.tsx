import { GetDimensions } from "./LucasNumber";
import { getEditor } from "../Components/editor/editor";
import { Card } from "core";
import { GetSearchComponent } from "../Components/search/search";
import { WindowActions } from "./WindowActions";

export type Overlay = JSX.Element | null;

export type WindowContents = {
    id: number;
    type: WindowTypes;
    card: Card;
};

export enum WindowTypes {
    Editor = "Editor",
    Graph = "Graph",
    Search = "Search",
}

export const WindowManger = ({
    windowActions,
    overlay,
    setWindows,
    setOverlay,
}: {
    windowActions: WindowActions;
    overlay: JSX.Element | null;
    setWindows: React.Dispatch<any>;
    setOverlay: React.Dispatch<any>;
}) => {
    let overlay_ = <div />;
    if (overlay !== null) {
        overlay_ = overlay;
    }
    return (
        <div id="WindowManagerSizer">
            {overlay_}
            <div id="WindowManger">
                {windowActions.windows.map((value, i) => (
                    <div key={i}>
                        <Window
                            content={value}
                            index={i}
                            length={windowActions.windows.length}
                            windowActions={windowActions}
                            setWindows={setWindows}
                            setOverlay={setOverlay}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Window = ({
    content,
    index,
    length,
    windowActions,
    setWindows,
    setOverlay,
}: {
    content: WindowContents;
    index: number;
    length: number;
    windowActions: WindowActions;
    setWindows: React.Dispatch<any>;
    setOverlay: React.Dispatch<any>;
}) => {
    const Content = GetContent(content, windowActions, setWindows, setOverlay);
    return (
        <div
            className="Window"
            style={{
                position: "absolute",
                overflow: "auto",
                ...GetDimensions(index, length),
            }}
        >
            {Content}
        </div>
    );
};

const GetContent = (
    content: WindowContents,
    windowActions: WindowActions,
    setWindows: React.Dispatch<any>,
    setOverlay: React.Dispatch<any>
) => {
    switch (content.type) {
        case WindowTypes.Editor:
            return getEditor(content.card);
        case WindowTypes.Search:
            return GetSearchComponent(windowActions, setWindows, setOverlay);
        default:
            return DefaultComponent(content.type.toString());
    }
};

const DefaultComponent = (message: string) => <p> {message} </p>;
