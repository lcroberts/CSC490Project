import MarkdownLogPlugin from './MarkdownLogPlugin';
import { listener } from '@milkdown/kit/plugin/listener';
import React from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from '@milkdown/crepe';
import DisableAutoEscapeBrackets from './DisableAutoEscapeBrackets';
import InlineMediaInputRule from './InlineMediaInputRule';
import { audioNode, customImageNode, videoNode } from './CustomNodes.js';
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload';
import { customUploader } from './UploadPlugin';
import { ProsemirrorAdapterProvider, usePluginViewFactory } from '@prosemirror-adapter/react';
import { html } from "@milkdown/kit/component"

const MilkdownEditor = ({ defaultContent }) => {
  const pluginViewFactory = usePluginViewFactory();
  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root: root,
      defaultValue: defaultContent,
      featureConfigs: {
        [Crepe.Feature.BlockEdit]: {
          slashMenuImageLabel: "Media",
        }
      }
    });
    crepe.editor.use([
      DisableAutoEscapeBrackets,
      InlineMediaInputRule,
      audioNode,
      videoNode,
      customImageNode,
      upload,
    ]);

    crepe.editor.config((ctx) => {
      ctx.update(uploadConfig.key, (prev) => ({
        ...prev,
        customUploader,
      }));
    });
    // crepe.editor.use([listener, MarkdownLogPlugin]);
    return crepe;
  });

  return <Milkdown />;
};

export const MarkdownEditor = ({ defaultContent }) => {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <MilkdownEditor defaultContent={defaultContent} />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  );
};
