import MarkdownLogPlugin from './MarkdownLogPlugin';
import { listener } from '@milkdown/kit/plugin/listener';
import React from 'react';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Crepe } from '@milkdown/crepe';
import DisableAutoEscapeBrackets from './DisableAutoEscapeBrackets';
import InlineMediaInputRule from './InlineMediaInputRule';
import { audioNode, customImageNode, mediaInputRule, mediaNode, remarkDirective, videoNode } from './CustomNodes.js';
import { ProsemirrorAdapterProvider, usePluginViewFactory, useNodeViewFactory } from '@prosemirror-adapter/react';
import { slash, SlashView } from './Slash';
import { $view } from '@milkdown/kit/utils';
import MediaUploadButton from './MediaUploadButton';
import MediaDisplayComponent from './MediaDisplayComponent';
import GetSetMarkdownPlugin from './SetMarkdownPlugin';

const MilkdownEditor = ({ defaultContent, setMarkdown = null }) => {
  const pluginViewFactory = usePluginViewFactory();
  const nodeViewFactory = useNodeViewFactory();


  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root: root,
      defaultValue: defaultContent,
      features: {
        [Crepe.Feature.BlockEdit]: false,
      }
    });
    crepe.editor.use([
      DisableAutoEscapeBrackets,
      InlineMediaInputRule,
      audioNode,
      videoNode,
      customImageNode,
      slash,
      remarkDirective,
      mediaNode,
      mediaInputRule,
      listener
    ]);

    if (setMarkdown) {
      crepe.editor.use(GetSetMarkdownPlugin(setMarkdown));
    }
    // crepe.editor.use(MarkdownLogPlugin);

    crepe.editor.use($view(mediaNode, () => nodeViewFactory({
      component: MediaUploadButton,
    })));

    crepe.editor.use($view(customImageNode, () => nodeViewFactory({
      component: MediaDisplayComponent,
    })));
    crepe.editor.use($view(audioNode, () => nodeViewFactory({
      component: MediaDisplayComponent,
    })));
    crepe.editor.use($view(videoNode, () => nodeViewFactory({
      component: MediaDisplayComponent,
    })));

    crepe.editor.config((ctx) => {
      ctx.set(slash.key, {
        view: pluginViewFactory({
          component: SlashView,
        })
      })
    });
    return crepe;
  });

  return <Milkdown />;
};

/**
 * @param {string} defaultContent - Default editor content
 * @param {?Function} setMarkdown - A function that takes the markdown value of the string and is ran on an editor change
 * @returns {JSX.Element}
 * @constructor
 */
export const MarkdownEditor = ({ defaultContent = "", setMarkdown = null }) => {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <MilkdownEditor defaultContent={defaultContent} setMarkdown={setMarkdown} />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  );
};
