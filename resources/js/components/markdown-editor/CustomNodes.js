import {
  isAudio,
  isImage,
  isVideo,
  splitToBaseAndExtension,
} from "@/lib/utils";
import { $inputRule, $node, $remark } from "@milkdown/kit/utils";
import { SlashView } from "./Slash";
import { InputRule } from "@milkdown/prose/inputrules";
import directive from "remark-directive";

const remarkPluginId = "remark-directive";
const remarkDirective = $remark(remarkPluginId, () => directive);

const audioNode = $node("audio", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
    alt: { default: null },
  },
  parseDOM: [
    {
      tag: "audio",
      getAttrs: (dom) => {
        return {
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return [
      "audio",
      { ...node.attrs, controls: true, class: "audio-block" },
      0,
    ];
  },
  parseMarkdown: {
    match: (node) => {
      if (node.type === "image-block") {
        const { base, extension } = splitToBaseAndExtension(node.url);
        return isAudio(extension);
      } else {
        return false;
      }
    },
    runner: (state, node, type) => {
      state.addNode(type, { src: node.url, alt: node.alt });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "audio",
    runner: (state, node) => {
      state.openNode("paragraph");
      state.addNode("image", undefined, undefined, {
        url: node.attrs.src,
        alt: node.attrs.alt,
      });
      state.closeNode();
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
    alt: { default: null },
  },
  parseDOM: [
    {
      tag: "video",
      getAttrs: (dom) => {
        return {
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return [
      "video",
      { ...node.attrs, controls: true, class: "video-block" },
      0,
    ];
  },
  parseMarkdown: {
    match: (node) => {
      if (node.type === "image-block") {
        const { base, extension } = splitToBaseAndExtension(node.url);
        return isVideo(extension);
      } else {
        return false;
      }
    },
    runner: (state, node, type) => {
      state.addNode(type, { src: node.url, alt: node.alt });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "video",
    runner: (state, node) => {
      state.openNode("paragraph");
      state.addNode("image", undefined, undefined, {
        url: node.attrs.src,
        alt: node.attrs.alt,
      });
      state.closeNode();
    },
  },
}));

const customImageNode = $node("custom-image", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
    alt: { default: null },
  },
  parseDOM: [
    {
      tag: "img",
      getAttrs: (dom) => {
        return {
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
        };
      },
    },
  ],
  toDOM: (node) => {
    return ["img", { ...node.attrs, class: "custom-image-block" }, 0];
  },
  parseMarkdown: {
    match: (node) => {
      if (node.type === "image-block") {
        const { base, extension } = splitToBaseAndExtension(node.url);
        return isImage(extension);
      } else {
        return false;
      }
    },
    runner: (state, node, type) => {
      state.addNode(type, { src: node.url, alt: node.alt });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "custom-image",
    runner: (state, node) => {
      state.openNode("paragraph");
      state.addNode("image", undefined, undefined, {
        url: node.attrs.src,
        alt: node.attrs.alt,
      });
      state.closeNode();
    },
  },
}));

const mediaNode = $node("media", () => ({
  group: "block",
  atom: true,
  isolating: true,
  marks: "",
  attrs: {
    src: { default: null },
    alt: { default: null },
  },
  parseDOM: [
    {
      tag: "input.media-upload",
      getAttrs: (dom) => {
        return {};
      },
    },
  ],
  toDOM: (node) => {
    return ["input", { ...node.attrs, type: "file", class: "media-upload" }, 0];
  },
  parseMarkdown: {
    match: (node) => node.type === "leafDirective" && node.name === "media",
    runner: (state, node, type) => {
      state.addNode(type, {});
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === "media",
    runner: (state, node) => {
      state.addNode("leafDirective", undefined, undefined, {
        name: "media",
        attributes: {},
      });
    },
  },
}));

const mediaInputRule = $inputRule(
  (ctx) =>
    new InputRule(/::media/, (state, match, start, end) => {
      const [okay] = match;
      const { tr } = state;

      if (okay) {
        tr.replaceWith(start - 1, end, mediaNode.type(ctx).create());
      }

      return tr;
    }),
);

export {
  audioNode,
  videoNode,
  customImageNode,
  remarkDirective,
  mediaNode,
  mediaInputRule,
};
