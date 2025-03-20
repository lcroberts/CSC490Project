import {
  isAudio,
  isImage,
  isVideo,
  splitToBaseAndExtension,
} from "@/lib/utils";
import { $node } from "@milkdown/kit/utils";

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
      state.addNode("image", void 0, void 0, {
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
      state.addNode("image", void 0, void 0, {
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
      tag: "custom-image",
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
      state.addNode("image", void 0, void 0, {
        url: node.attrs.src,
        alt: node.attrs.alt,
      });
      state.closeNode();
    },
  },
}));

export { audioNode, videoNode, customImageNode };
