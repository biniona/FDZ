import "./App.css";

import {
    WindowManger,
    WindowContents,
    WindowTypes,
} from "./Window/WindowManager";
import { SideBar } from "./Components/sidebar/SideBar";
import { useState } from "react";
import { WindowActions } from "./Window/WindowActions";
import { Overlay } from "./Window/WindowManager";
import {
    NewOrReplaceEditor,
    NewOrReplaceSearch,
    RemoveWindow,
} from "./Components/sidebar/SideBarOptions";

const defaultWindows: WindowContents[] = [
    { id: 1, type: WindowTypes.Editor, card: null },
    { id: 3, type: WindowTypes.Editor, card: null },
    { id: 1, type: WindowTypes.Editor, card: null },
    { id: 3, type: WindowTypes.Editor, card: null },
];

const App = () => {
    const [overlay, setOverlay]: [Overlay, React.Dispatch<any>] =
        useState(null);
    const [windows, setWindows] = useState(defaultWindows);
    const windowActions = new WindowActions(windows);
    const SidebarOptions = [
        NewOrReplaceEditor(overlay, setOverlay, windowActions, setWindows),
        NewOrReplaceSearch(overlay, setOverlay, windowActions, setWindows),
        RemoveWindow(overlay, setOverlay, windowActions, setWindows),
    ];
    return (
        <div id="AppDiv" className="App">
            <SideBar components={SidebarOptions} />
            <WindowManger
                windowActions={windowActions}
                overlay={overlay}
                setWindows={setWindows}
                setOverlay={setOverlay}
            />
        </div>
    );
};

export default App;
