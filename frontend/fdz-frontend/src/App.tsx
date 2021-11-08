import "./App.css";

import { WindowManger, WindowContents, WindowTypes } from "./WindowManager";

function App() {
    const windows: WindowContents[] = [
        { type: WindowTypes.Graph },
        { type: WindowTypes.Editor },
        { type: WindowTypes.Graph },
        { type: WindowTypes.Graph },
        { type: WindowTypes.Graph },
    ];
    return (
        <div className="App">
            <WindowManger windows={windows} />
        </div>
    );
}

export default App;
