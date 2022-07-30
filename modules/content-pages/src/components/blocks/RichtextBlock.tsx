import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as _ from "lodash";
import { EditorState } from "draft-js";
import React from "react";


const RichtextBlock: React.FC<any> = (props) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (val:any) => {
    setEditorState(val);
    props.onChange(JSON.stringify(val));
    console.log(props)
  };
  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        toolbarOnFocus
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "emoji",
            "remove",
            "history",
          ],
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
};
export default RichtextBlock;
