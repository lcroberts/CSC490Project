import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";
import { audioNode, videoNode } from "./CustomNodes";
import { isAudio, isImage, isVideo, splitToBaseAndExtension } from "@/lib/utils";

const InlineMediaInputRule = $inputRule(
  (ctx) =>
    // Regex matches links
    new InputRule(/(!?)\[(.*?)\]\((.*?)\)/, (state, match, start, end) => {
      const { tr } = state;
      if (match[1] !== "!") {
        // regular link
        return tr;
      }
      const {base, extension} = splitToBaseAndExtension(match[3]);
      console.log(base, extension);
      // if (!extension) {
      //   // no file extension so regular link
      //   // TODO: FIX THIS IF STATEMENT
      //   return tr;
      // }
      console.log(base, extension);

      if (isImage(extension)) {
      } else if (isVideo(extension)) {
        tr.replaceWith(start - 1, end, videoNode.type(ctx).create({ src: base + "." + extension }));
      } else if (isAudio(extension)) {
        tr.replaceWith(start - 1, end, audioNode.type(ctx).create({ src: base + "." + extension }));
      } else {
        // Normal link
      }
      return tr;
    }),
);

export default InlineMediaInputRule;
