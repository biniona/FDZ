import "./App.css";

import { WindowManger, WindowContents, WindowTypes } from "./WindowManager";
import { SideBar } from "./SideBar";

const windows: WindowContents[] = [
    { type: WindowTypes.Editor, card: null },
    { type: WindowTypes.Editor, card: null },
    { type: WindowTypes.Search, card: null },
];

function App() {
    return (
        <div id="AppDiv" className="App">
            <SideBar />
            <WindowManger windows={windows} overlaid={false} />
        </div>
    );
}

export default App;
