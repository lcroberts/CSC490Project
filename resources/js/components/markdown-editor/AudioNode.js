import { $node, $remark, $inputRule } from "@milkdown/kit/utils";
import { InputRule } from "@milkdown/prose/inputrules";
import directive from "remark-directive";

const audioDirective = $remark("custom-audio", () => directive);
const audioNode = $node("audio", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: "audio",
      getAttrs: (dom) => {
        // TODO: Get attributes from child
        console.log(dom);
        return {
          src: dom.getAttribute("src"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return ["audio", { ...node.attrs, contenteditable: false }, 0];
  },
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "audio",
    runner: (state, node, type) => {
      state.addNode(type, { src: node.attributes.src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "audio",
    runner: (state, node) => {
      // TODO: Find child and get source and type from it
      console.log(state, node);
      state.addNode("leafDirective", undefined, undefined, {
        name: "audio",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

const audioInputRule = $inputRule(
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

export { audioNode, audioInputRule, audioDirective };
