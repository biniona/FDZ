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
import { loadCards } from "./API/data";

const defaultWindows: WindowContents[] = [
    { id: "default-window", type: WindowTypes.Search, card: null },
];

const App = () => {
    const [overlay, setOverlay]: [Overlay, React.Dispatch<any>] =
        useState(null);
    const [windows, setWindows] = useState(defaultWindows);
    const [cards, setCards] = useState({});
    if (Object.keys(cards).length === 0) {
        loadCards(setCards);
    }
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
                cards={cards}
            />
        </div>
    );
};

export default App;
