import { GetDimensions } from "./LucasNumber";
import { EditorComponent } from "./Components/editor";

export type WindowContents = {
    type: WindowTypes;
};

export enum WindowTypes {
    Editor = "Editor",
    Graph = "Graph",
    Search = "Search",
}

export const WindowManger = ({ windows }: { windows: WindowContents[] }) => (
    <div id="WindowManagerSizer">
        <div id="WindowManger">
            {windows.map((value, i) => (
                <div key={i}>
                    <Window content={value} index={i} length={windows.length} />
                </div>
            ))}
        </div>
    </div>
);

const Window = ({
    content,
    index,
    length,
}: {
    content: WindowContents;
    index: number;
    length: number;
}) => {
    const Content = GetContent(content.type);
    return (
        <div
            className="Window"
            style={{
                position: "absolute",
                ...GetDimensions(index, length),
            }}
        >
            {Content}
        </div>
    );
};

const GetContent = (contentType: WindowTypes) => {
    switch (contentType) {
        case WindowTypes.Editor:
            return <EditorComponent />;
        default:
            return DefaultComponent(contentType.toString());
    }
};

const DefaultComponent = (message: string) => <p> {message} </p>;
