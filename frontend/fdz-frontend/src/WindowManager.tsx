import { GetDimensions } from "./LucasNumber";

export type WindowContents = {
    type: WindowTypes;
};

export enum WindowTypes {
    Editor = "Editor",
    Graph = "Graph",
}

export const WindowManger = ({ windows }: { windows: WindowContents[] }) => (
    <div id="WindowManger">
        {windows.map((value, i) => (
            <div key={i}>
                <Window content={value} index={i} length={windows.length} />
            </div>
        ))}
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
}) => (
    <div
        className="Window"
        style={{
            position: "absolute",
            ...GetDimensions(index, length),
        }}
    >
        <p> {content.type} </p>
    </div>
);
