import useAxios from "@/hooks/useAxios";
import { encryptBuffer, getEncryptionKey, isAudio, isImage, isVideo, splitToBaseAndExtension } from "@/lib/utils";
import { editorViewCtx } from "@milkdown/kit/core";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react"
import { useEffect, useState } from "react";
import { audioNode, customImageNode, videoNode } from "./CustomNodes";

const MediaUploadButton = () => {
  const { contentRef } = useNodeViewContext()
  const [_, getInstance] = useInstance();
  const http = useAxios();

  /** @type {[?File, Function]} */
  const [finalFile, setFinalFile] = useState(null);

  useEffect(() => {
    const func = async () => {
      if (!finalFile) {
        return;
      }
      const editor = getInstance();
      const ctx = editor.ctx;
      const view = ctx.get(editorViewCtx);
      const { dispatch, state } = view;
      const { tr, selection } = state;

      const src = finalFile.name;
      const alt = finalFile.name;
      // TODO: Use sumamries to get alt text

      const formData = new FormData();
      formData.append("name", finalFile.name);
      formData.append("note_id", 1); // TODO: Use appropriate note_id
      const reader = new FileReader();
      reader.onload = async (event) => {
        const buffer = new Uint8Array(event.target.result);
        const key = await getEncryptionKey()
        const fileData = await encryptBuffer(buffer, key);
        const file = new File(fileData, finalFile.name, {
          type: finalFile.type
        });
        formData.append("body", file);
        http.post("/api/media/create", formData).then((res) => {
          setTimeout(() => {
            if (isVideo(file.type)) {
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                videoNode.type(ctx).create({ src: src, alt: alt }),
              ));
            } else if (isAudio(file.type)) {
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                audioNode.type(ctx).create({ src: src, alt: alt }),
              ));
            } else {
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                customImageNode.type(ctx).create({ src: src, alt: alt }),
              ));
            }
          });
        });
      };
      reader.readAsArrayBuffer(finalFile);
    }

    func();
  }, [finalFile]);

  const onChange = async (e) => {
    /** @type {File|null} */
    let file = e.target.files[0] || undefined;
    if (file) {
      if (isImage(file.type)) {
        // Convert image to webp
        const imageData = await createImageBitmap(file);
        const image = new Image();
        image.width = imageData.width;
        image.height = imageData.height;
        image.src = URL.createObjectURL(file);;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext('2d').drawImage(image, 0, 0);
          canvas.toBlob((blob) => {
            const { base } = splitToBaseAndExtension(file.name);
            const myImage = new File([blob], base + '.webp', { type: blob.type });
            setFinalFile(myImage);
          }, 'image/webp');
        }
      } else {
        setFinalFile(file);
      }
    }
  }

  return (
    <input
      onChange={onChange}
      type="file"
      className="media-upload w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
      accept="image/*, video/*, audio/*"
      ref={contentRef}
    />
  )
}

export default MediaUploadButton
