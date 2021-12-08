import { GetDimensions } from "./LucasNumber";
import { getEditor } from "./Components/editor/editor";
import { Card } from "./Model";
import { getSearchComponent } from "./Components/search/search";

export type WindowContents = {
    type: WindowTypes;
    card: Card;
};

export enum WindowTypes {
    Editor = "Editor",
    Graph = "Graph",
    Search = "Search",
}

export const WindowManger = ({
    windows,
    overlaid,
}: {
    windows: WindowContents[];
    overlaid: boolean;
}) => {
    let overlay: JSX.Element = <div />;
    if (overlaid === true) {
        overlay = WindowOverlay(windows.length);
    }
    return (
        <div id="WindowManagerSizer">
            {overlay}
            <div id="WindowManger">
                {windows.map((value, i) => (
                    <div key={i}>
                        <Window
                            content={value}
                            index={i}
                            length={windows.length}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const WindowOverlay = (currNumWindows: number) => {
    const numWindows = currNumWindows + 1;
    const windowRange = Array.from({ length: numWindows }, (x, i) => i);
    return (
        <div id="WindowOverlay">
            {windowRange.map((i) => (
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
                        <a>Remove</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Window = ({
    content,
    index,
    length,
}: {
    content: WindowContents;
    index: number;
    length: number;
}) => {
    const Content = GetContent(content);
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

const GetContent = (content: WindowContents) => {
    switch (content.type) {
        case WindowTypes.Editor:
            return getEditor(content.card);
        case WindowTypes.Search:
            return getSearchComponent();
        default:
            return DefaultComponent(content.type.toString());
    }
};

const DefaultComponent = (message: string) => <p> {message} </p>;
