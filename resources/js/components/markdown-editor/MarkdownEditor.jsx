import React from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from '@milkdown/crepe';
import DisableAutoEscapeBrackets from './DisableAutoEscapeBrackets';
// import MarkdownLogPlugin from './MarkdownLogPlugin';
import HandleLinkPlugin from './AutoInsertImage';

const MilkdownEditor = ({defaultValue = ""}) => {
  // `get` returns the editor info
  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root: root,
      defaultValue: defaultValue,
    });
    crepe.editor.use([
      DisableAutoEscapeBrackets,
      HandleLinkPlugin,
    ]);
    // crepe.editor.use(MarkdownLogPlugin);
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
