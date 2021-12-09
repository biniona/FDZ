import "./App.css";

import {
    WindowManger,
    WindowContents,
    WindowTypes,
} from "./Window/WindowManager";
import { SideBar } from "./SideBar";
import { useState } from "react";
import { WindowActions } from "./Window/WindowActions";

const defaultWindows: WindowContents[] = [
    { id: 1, type: WindowTypes.Editor, card: null },
    { id: 3, type: WindowTypes.Search, card: null },
    { id: 1, type: WindowTypes.Editor, card: null },
    { id: 3, type: WindowTypes.Search, card: null },
];

function App() {
    const [overlay, setOverlay] = useState(false);
    const [windows, setWindows] = useState(defaultWindows);
    const toggleOverlayButton = (
        <a onClick={() => setOverlay(!overlay)}>Overlay</a>
    );
    let windowActions = new WindowActions(windows, setWindows);
    return (
        <div id="AppDiv" className="App">
            <SideBar components={[toggleOverlayButton]} />
            <WindowManger windowActions={windowActions} overlaid={overlay} />
        </div>
    );
}

export default App;
