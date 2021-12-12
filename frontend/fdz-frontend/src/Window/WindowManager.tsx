import {
    Dimensions,
    ConvertDimensionsToPercent,
    GetDimensions,
} from "./LucasNumber";
import { getEditor } from "../Components/editor/editor";
import { Card, Cards } from "core";
import { GetSearchComponent } from "../Components/search/search";
import { WindowActions } from "./WindowActions";

export type Overlay = JSX.Element | null;

export type WindowContents = {
    id: string;
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
    cards,
}: {
    windowActions: WindowActions;
    overlay: JSX.Element | null;
    setWindows: React.Dispatch<any>;
    setOverlay: React.Dispatch<any>;
    cards: Cards;
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
                            cards={cards}
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
    cards,
}: {
    content: WindowContents;
    index: number;
    length: number;
    windowActions: WindowActions;
    setWindows: React.Dispatch<any>;
    setOverlay: React.Dispatch<any>;
    cards: Cards;
}) => {
    const dimensions = GetDimensions(index, length);
    const dimensionsPercents = ConvertDimensionsToPercent(dimensions);
    const Content = GetContent(
        content,
        windowActions,
        setWindows,
        setOverlay,
        cards,
        dimensions
    );
    return (
        <div
            className="Window"
            style={{
                position: "absolute",
                overflow: "auto",
                ...dimensionsPercents,
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
    setOverlay: React.Dispatch<any>,
    cards: Cards,
    dimensions: Dimensions
) => {
    switch (content.type) {
        case WindowTypes.Editor:
            return getEditor(content.card);
        case WindowTypes.Search:
            return GetSearchComponent(
                windowActions,
                setWindows,
                setOverlay,
                cards,
                dimensions
            );
        default:
            return DefaultComponent(content.type.toString());
    }
};

const DefaultComponent = (message: string) => <p> {message} </p>;
