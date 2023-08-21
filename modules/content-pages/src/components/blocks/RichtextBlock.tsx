import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as _ from "lodash";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import React from "react";

const RichtextBlock: React.FC<any> = (props) => {
  const [editorState, setEditorState] = React.useState(() =>
    props?.value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(props?.value)))
      : EditorState.createEmpty()
  );
  const onEditorStateChange = (val: any) => {
    setEditorState(val);
    const currContent = val?.getCurrentContent();
    props.onChange(JSON.stringify(convertToRaw(currContent)));
    console.log(props);
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
