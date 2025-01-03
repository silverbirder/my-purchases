"use client";

import {
  type JSONContent,
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import { handleCommandNavigation } from "novel/extensions";
import { slashCommand, suggestionItems } from "./slash";
import { useDebouncedCallback } from "use-debounce";
import { type EditorEvents } from "@tiptap/react";
import {
  ColorSelector,
  LinkSelector,
  NodeSelector,
  TextButtons,
} from "./bubble";

export const Novel = () => {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const extensions = [...defaultExtensions, slashCommand];

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: EditorEvents["update"]) => {
      const json = editor.getJSON();
      setContent(json);
    },
    500,
  );

  return (
    <EditorRoot>
      <EditorContent
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
        extensions={extensions}
        initialContent={content}
        onUpdate={debouncedUpdates}
        immediatelyRender={false}
      >
        <EditorBubble
          tippyOptions={{
            placement: "top",
          }}
          className="border-muted bg-background flex w-fit max-w-[90vw] overflow-hidden rounded border shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <TextButtons />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
        <EditorCommand className="border-muted bg-background z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="text-muted-foreground px-2">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`hover:bg-accent aria-selected:bg-accent flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm`}
                key={item.title}
              >
                <div className="border-muted bg-background flex h-10 w-10 items-center justify-center rounded-md border">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};
