import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";
import { audioNode, videoNode } from "./CustomNodes";
import { isAudio, isImage, isVideo } from "@/lib/utils";

const InlineMediaInputRule = $inputRule(
  (ctx) =>
    // Regex matches links
    new InputRule(/(!?)\[(.*?)\]\((.*?)\)/, (state, match, start, end) => {
      console.log("running");
      const { tr } = state;
      if (match[1] !== "!") {
        // regular link
        return tr;
      }
      const parts = match[3].split(".");
      // if (!extension) {
      //   // no file extension so regular link
      //   // TODO: FIX THIS IF STATEMENT
      //   return tr;
      // }
      const extension = parts.pop();
      const name = parts.join(".");
      console.log(name, extension);

      if (isImage(extension)) {
      } else if (isVideo(extension)) {
        tr.replaceWith(start - 1, end, videoNode.type(ctx).create({ src: name + "." + extension }));
      } else if (isAudio(extension)) {
        tr.replaceWith(start - 1, end, audioNode.type(ctx).create({ src: name + "." + extension }));
      } else {
        // Normal link
      }
      return tr;
    }),
);

export default InlineMediaInputRule;
