"use client";

import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";

export default function Editor() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        // Saves the document JSON to state.
        setBlocks(editor.document);
      }}
    />
  );
}
