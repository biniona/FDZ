import "./App.css";

import { WindowManger, WindowContents, WindowTypes } from "./WindowManager";
import { SideBar } from "./SideBar";

const windows: WindowContents[] = [
    { type: WindowTypes.Editor },
    { type: WindowTypes.Editor },
    { type: WindowTypes.Graph },
    { type: WindowTypes.Graph },
    { type: WindowTypes.Graph },
    { type: WindowTypes.Graph },
];

function App() {
    return (
        <div id="AppDiv" className="App">
            <SideBar />
            <WindowManger windows={windows} />
        </div>
    );
}

export default App;
