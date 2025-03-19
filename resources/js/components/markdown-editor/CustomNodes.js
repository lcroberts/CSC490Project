import { $node, $remark } from "@milkdown/kit/utils";
import directive from "remark-directive";

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
        console.log(dom);
        return {
          src: dom.getAttribute("src"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return ["audio", { ...node.attrs, controls: true }, 0];
  },
  parseMarkdown: {
    match: (node) => {
      if (node.type === "image-block") {
        return node.name === "audio";
      } else {
        return false;
      }
    },
    runner: (state, node, type) => {
      state.addNode(type, { src: node.attributes.src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "audio",
    runner: (state, node) => {
      console.log(state, node);
      state.addNode("leafDirective", undefined, undefined, {
        name: "audio",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

const videoNode = $node("video", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: "video",
      getAttrs: (dom) => {
        console.log(dom);
        return {
          src: dom.getAttribute("src"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return ["video", { ...node.attrs, controls: true }, 0];
  },
  parseMarkdown: {
    match: (node) => {
      return node.type === "leafDirective" && node.name === "video";
    },
    runner: (state, node, type) => {
      state.addNode(type, { src: node.attributes.src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "video",
    runner: (state, node) => {
      console.log(state, node);
      state.addNode("leafDirective", undefined, undefined, {
        name: "video",
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export { audioNode, videoNode };
