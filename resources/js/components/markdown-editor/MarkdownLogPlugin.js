import { listenerCtx } from "@milkdown/kit/plugin/listener";

export default function MarkdownLogPlugin(ctx) {
  return () => {
    /** @type ListenerManager */
    const listener = ctx.get(listenerCtx);
    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      console.log(markdown);
    });
  };
}
