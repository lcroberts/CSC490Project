import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";
import { audioNode, videoNode } from "./CustomNodes";
import { isAudio, isImage, isVideo } from "@/lib/utils";

const InlineMediaInputRule = $inputRule(
  (ctx) =>
    // Regex matches links
    new InputRule(/(!?)\[(.*?)\]\((.*?)\)/, (state, match, start, end) => {
      const { tr } = state;
      if (match[1] !== "!") {
        // regular link
        return tr;
      }
      const [name, extension] = match[3].split(".");
      if (!extension) {
        // no file extension so regular link
        return tr;
      }

      if (isImage(extension)) {
      } else if (isVideo(extension)) {
        tr.replaceWith(start - 1, end, videoNode.type(ctx).create({ src }));
      } else if (isAudio(extension)) {
        tr.replaceWith(start - 1, end, audioNode.type(ctx).create({ src }));
      } else {
        // Normal link
      }
      return tr;
    }),
);

export default InlineMediaInputRule;
