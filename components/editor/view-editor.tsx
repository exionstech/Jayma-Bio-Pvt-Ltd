import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { SetStateAction } from "react";

interface EditorProps {
  initialContent?: Block[] | null;
}

const ViewEditor = ({ initialContent }: EditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent || [
      {
        type: "paragraph",
        content: "Nothings here",
      },
    ],
  });

  return (
    <div className="w-full min-h-[200px] border rounded-md" aria-disabled>
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => {}}
        aria-disabled
      />
    </div>
  );
};

export default ViewEditor;
