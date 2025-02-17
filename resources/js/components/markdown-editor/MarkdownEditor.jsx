import React from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from '@milkdown/crepe';

const MilkdownEditor = () => {
  // `get` returns the editor info
  const { get } = useEditor((root) => {
    return new Crepe({
      root: root,
      defaultValue: "Hello"
    });
  });

  return <Milkdown />;
};

export const MarkdownEditor = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};
