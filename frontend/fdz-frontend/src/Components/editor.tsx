import {
  plugins,
  schema,
  toolbar,
} from "@aeaton/react-prosemirror-config-default";
import { Editor, HtmlEditor, Toolbar } from "@aeaton/react-prosemirror";
import React, { useState } from "react";

import "./editorStyles/demo.css";
import "./editorStyles/prosemirror.css";

const initialValue = `<p></p>`;

export const EditorComponent: React.FC = () => {
  const [_, setHTML] = useState<string>(initialValue);

  return (
    <div>
      <div className="prosemirror-demo">
        <div className="prosemirror-demo-editor">
          <HtmlEditor
            schema={schema}
            plugins={plugins}
            value={initialValue}
            handleChange={setHTML}
            debounce={1000}
          >
            <Toolbar toolbar={toolbar} />
            <Editor autoFocus />
          </HtmlEditor>
        </div>
      </div>
    </div>
  );
};
