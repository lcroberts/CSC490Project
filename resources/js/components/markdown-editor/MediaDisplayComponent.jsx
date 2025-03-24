import useAxios from "@/hooks/useAxios";
import { isUrl } from "@/lib/utils";
import { useNodeViewContext } from "@prosemirror-adapter/react"
import { useEffect, useState } from "react";

const MediaDisplayComponent = () => {
  const { node } = useNodeViewContext();
  const http = useAxios();
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (isUrl(node.attrs.src)) {
      setSrc(node.attrs.src);
    } else {
      // Fetch media from server in this case
      const func = async () => {
        const noteId = 1;
        http.get(`/api/media/${noteId}/${node.attrs.src}`).then((res) => {
          console.log(res);
        })
      }

      func();
    }
  })
  return (
    <>
      {src !== null ?
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
        :
        <>
          // Display loading here
        </>
      }
    </>
  )
}

export default MediaDisplayComponent
