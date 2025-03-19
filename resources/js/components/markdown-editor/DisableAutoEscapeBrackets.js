import { remarkStringifyOptionsCtx } from "@milkdown/kit/core";

export default function DisableAutoEscapeBrackets(ctx) {
  const customHandlers = {
    // Handle text nodes (in Markdown, this is a 'text' node)
    text(node) {
      // Custom handling: Return text without any escaping
      return node.value.replace(/\\([{}[\]])/g, "$1"); // Remove escape for brackets and backslashes
    },
  };

  return () => {
    ctx.set(remarkStringifyOptionsCtx, {
      handlers: customHandlers,
    });
  };
}
