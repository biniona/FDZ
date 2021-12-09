import { GetDimensions } from "./LucasNumber";
import { getEditor } from "../Components/editor/editor";
import { Card } from "../Model";
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
}: {
    windowActions: WindowActions;
    overlay: JSX.Element | null;
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
            return GetSearchComponent();
        default:
            return DefaultComponent(content.type.toString());
    }
};

const DefaultComponent = (message: string) => <p> {message} </p>;
