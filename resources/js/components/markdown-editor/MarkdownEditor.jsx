import React from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from '@milkdown/crepe';
import DisableAutoEscapeBrackets from './DisableAutoEscapeBrackets';

const MilkdownEditor = () => {
  // `get` returns the editor info
  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root: root,
      defaultValue: "Hello"
    });
    crepe.editor.use(DisableAutoEscapeBrackets);
    return crepe;
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
