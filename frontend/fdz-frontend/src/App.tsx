import "./App.css";

import { WindowManger, WindowContents, WindowTypes } from "./WindowManager";
import { SideBar } from "./SideBar";

function App() {
    const windows: WindowContents[] = [
        { type: WindowTypes.Graph },
        { type: WindowTypes.Editor },
        { type: WindowTypes.Graph },
        { type: WindowTypes.Editor },
        { type: WindowTypes.Graph },
        { type: WindowTypes.Editor },
    ];
    return (
        <div id="AppDiv" className="App">
            <SideBar />
            <WindowManger windows={windows} />
        </div>
    );
}

export default App;
