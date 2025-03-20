import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";
import { audioNode, customImageNode, videoNode } from "./CustomNodes";
import {
  isAudio,
  isImage,
  isVideo,
  splitToBaseAndExtension,
} from "@/lib/utils";

const InlineMediaInputRule = $inputRule(
  (ctx) =>
    // Regex matches links
    new InputRule(/(!?)\[(.*?)\]\((.*?)\)/, (state, match, start, end) => {
      const { tr } = state;
      if (match[1] !== "!") {
        // regular link
        tr.addMark(start - 1, end, "link");
        return tr;
      }
      const { base, extension } = splitToBaseAndExtension(match[3]);

      if (isVideo(extension)) {
        tr.replaceWith(
          start - 1,
          end,
          videoNode.type(ctx).create({ src: match[3], alt: match[2] }),
        );
      } else if (isAudio(extension)) {
        tr.replaceWith(
          start - 1,
          end,
          audioNode.type(ctx).create({ src: match[3], alt: match[2] }),
        );
      } else {
        // Image
        tr.replaceWith(
          start - 1,
          end,
          customImageNode.type(ctx).create({ src: match[3], alt: match[2] }),
        );
      }
      return tr;
    }),
);

export default InlineMediaInputRule;
