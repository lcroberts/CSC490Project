import { InputRule } from "@milkdown/prose/inputrules";
import { $inputRule } from "@milkdown/utils";

const HandleLinkPlugin = $inputRule(
  () =>
    // Regex matches links
    new InputRule(/(!?)\[.*?\]\(.*?\)/, (state, match, start, end) => {
      console.log(state);
      console.log(match);
      console.log(start);
      console.log(end);
    }),
);

export default HandleLinkPlugin;
