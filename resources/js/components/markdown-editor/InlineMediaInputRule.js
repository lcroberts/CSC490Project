import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";
import { audioNode } from "./CustomNodes";

// const InlineMediaInputRule = $inputRule(
  // () =>
  //   // Regex matches links
  //   new InputRule(/(!?)\[.*?\]\(.*?\)/, (state, match, start, end) => {
  //     console.log(state);
  //     console.log(match);
  //     console.log(start);
  //     console.log(end);
  //   }),
  //
// );

const InlineMediaInputRule = $inputRule(
  (ctx) =>
    new InputRule(
      /::audio\{src\="(?<src>[^"]+)?"?\}/,
      (state, match, start, end) => {
        const [okay, src = ""] = match;
        const { tr } = state;
        if (okay) {
          tr.replaceWith(start - 1, end, audioNode.type(ctx).create({ src }));
        }

        return tr;
      },
    ),
);

export default InlineMediaInputRule;
