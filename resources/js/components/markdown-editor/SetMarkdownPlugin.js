import { listenerCtx } from "@milkdown/kit/plugin/listener";

export default function GetSetMarkdownPlugin(setMarkdown) {
  return (ctx) => {
    return () => {
      /** @type ListenerManager */
      const listener = ctx.get(listenerCtx);
      listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
        setMarkdown(markdown);
      });
    };
  };
}
