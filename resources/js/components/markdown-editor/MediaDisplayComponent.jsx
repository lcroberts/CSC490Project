import useAxios from "@/hooks/useAxios";
import { decryptData, getEncryptionKey, isUrl } from "@/lib/utils";
import { useNodeViewContext } from "@prosemirror-adapter/react"
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { Textarea } from "../ui/textarea";
import Spinner from "../ui/spinner";
import useAppState from "@/hooks/useAppState";

const MediaDisplayComponent = () => {
  const { node, setAttrs } = useNodeViewContext();
  const [altShown, setAltShown] = useState(false);
  const http = useAxios();
  const [src, setSrc] = useState(null);
  const { activeNoteInfo } = useAppState();

  useEffect(() => {
    if (isUrl(node.attrs.src)) {
      setSrc(node.attrs.src);
    } else {
      // Fetch media from server in this case
      const func = async () => {
        const noteId = activeNoteInfo.id;
        let contents = await http.get(`/api/media/${noteId}/${node.attrs.src}`);
        contents = contents.data.body;
        const key = await getEncryptionKey();
        const data = await decryptData(contents, key);
        const blob = new Blob([data]);
        setSrc(URL.createObjectURL(blob));
      }

      func();
    }
  }, [])

  return (
    <>
      {src !== null ?
        <>
          <div className="custom-media-block flex justify-center">
            {node.type.name === "custom-image" &&
              <img className="custom-image-block" src={src} alt={node.attrs.alt} />
            }
            {node.type.name === "audio" &&
              <audio className="audio-block" src={src} alt={node.attrs.alt} controls />
            }
            {node.type.name === "video" &&
              <video className="video-block" src={src} alt={node.attrs.alt} controls />
            }
          </div>
          <div className="text-center text-gray-700" onClick={() => setAltShown(true)}>Show Alt Text</div>
          <Modal show={altShown} maxWidth="2xl" onClose={() => setAltShown(false)}>
            <div className="flex px-4">
              <h2 className="text-2xl font-semibold mr-auto">Alt Text</h2>
              <button onClick={() => setAltShown(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>
            <hr />
            <div className="p-3">
              <Textarea className="text-lg min-h-60" value={node.attrs.alt} onChange={(e) => setAttrs({
                ...node.attrs,
                alt: e.target.value
              })}>
              </Textarea>
            </div>
          </Modal>
        </>
        :
        <div className="flex gap-4 items-center">
          <Spinner className={"w-8 h-8"} />
          <span className="text-lg">Fetching Media</span>
        </div>
      }
    </>
  )
}

export default MediaDisplayComponent
