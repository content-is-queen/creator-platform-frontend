import { useState, useEffect } from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";

const Editor = ({ children, onChange }) => {
  const initialValue = "";
  const [value, setValue] = useState(initialValue ?? "");
  useEffect(() => setValue(initialValue ?? ""), [initialValue]);

  const handleChange = (value) => {
    setValue(value);
    onChange(value);
  };
  return (
    <div>
      <p className="uppercase mb-4">{children}</p>
      <TinyEditor
        apiKey={process.env.NEXT_PUBLIC_TINY}
        init={{
          selector: "textarea",
          menubar: false,
          plugins:
            "anchor autolink emoticons link lists visualblocks wordcount checklist linkchecker a11ychecker tinymcespellchecker autocorrect markdown",
          toolbar:
            "undo redo | bold italic underline strikethrough | link spellcheckdialog a11ycheck typography | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
        initialValue={initialValue}
        value={value}
        onEditorChange={(newValue, editor) => {
          handleChange(newValue);
        }}
      />
    </div>
  );
};

export default Editor;
