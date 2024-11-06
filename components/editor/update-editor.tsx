import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { SetStateAction } from "react";

interface EditorProps {
  setBlocks: React.Dispatch<SetStateAction<Block[]>>;
  initialContent?: Block[] | null;
}

const UpdateEditor = ({ setBlocks, initialContent }: EditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent || [
      {
        type: "paragraph",
        content: "Enter your text here",
      },
    ],
  });

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

export default UpdateEditor;
