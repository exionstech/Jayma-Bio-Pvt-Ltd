import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { SetStateAction } from "react";

interface EditorProps {
  setBlocks: React.Dispatch<SetStateAction<Block[]>>;
}

const AddEditor = ({ setBlocks }: EditorProps) => {
  const editor = useCreateBlockNote();

  return (
    <div className="w-full min-h-[200px] border rounded-md">
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {
          setBlocks(editor.document);
        }}
      />
    </div>
  );
};

export default AddEditor;
