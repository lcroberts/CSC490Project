import { isUrl } from "@/lib/utils";
import { useNodeViewContext } from "@prosemirror-adapter/react"

const MediaDisplayComponent = () => {
  const { node } = useNodeViewContext();
  let src;
  if (isUrl(node.attrs.src)) {
    src = node.attrs.src;
  } else {
    // Fetch media from server in this case
    src = node.attrs.src;
  }
  return (
    <>
      {node.type.name === "custom-image" &&
        <img className="custom-image-block" src={src} alt={node.attrs.alt} />
      }
      {node.type.name === "audio" &&
        <audio className="audio-block" src={src} alt={node.attrs.alt} controls />
      }
      {node.type.name === "video" &&
        <video className="video-block" src={src} alt={node.attrs.alt} controls />
      }
    </>
  )
}

export default MediaDisplayComponent
