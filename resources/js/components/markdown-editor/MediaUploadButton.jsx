import useAxios from "@/hooks/useAxios";
import { encryptBuffer, getEncryptionKey, isAudio, isImage, isVideo, splitToBaseAndExtension } from "@/lib/utils";
import { editorViewCtx } from "@milkdown/kit/core";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react"
import { useEffect, useState } from "react";
import { audioNode, customImageNode, videoNode } from "./CustomNodes";
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MiB

/**
 * @param {{width: number, height: number}} dimensions
 * @returns {{width: number, height: number}}
 */
function calculateImageDimensions(dimensions) {
  const API_MAX_LONG_SIDE_LENGTH = 2000;
  const API_MAX_SHORT_SIDE_LENGTH = 768;
  const { width, height } = dimensions;

  // Calculate ratio of the long/short dimensions to the max available ones
  let longDimension;
  let shortDimension;
  if (width > height) {
    longDimension = width;
    shortDimension = height;
  } else {
    longDimension = height;
    shortDimension = width;
  }
  const longRatio = longDimension / API_MAX_LONG_SIDE_LENGTH;
  const shortRatio = shortDimension / API_MAX_SHORT_SIDE_LENGTH;
  if (longRatio <= 1 && shortRatio <= 1) {
    // Both dimensions are within the bounds so just return the image dimensions
    return dimensions;
  }

  // Calculate which side is over by more to scale down both sides by the appropriate amount to maintain the aspect ratio
  const maxRatio = Math.max(longRatio, shortRatio);

  return {
    width: Math.floor(width / maxRatio),
    height: Math.floor(height / maxRatio)
  }
}

const MediaUploadButton = () => {
  // TODO: Limit file upload size to 25MB
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

      const formData = new FormData();
      formData.append("name", finalFile.name);
      formData.append("note_id", 1); // TODO: Use appropriate note_id
      const reader = new FileReader();
      reader.onload = async (event) => {
        const buffer = new Uint8Array(event.target.result);
        const key = await getEncryptionKey()
        const fileData = await encryptBuffer(buffer, key);
        formData.append("body", fileData);
        http.post("/api/media/create", formData).then((res) => {
          setTimeout(async () => {
            if (isVideo(finalFile.type)) {
              const alt = finalFile.name;
              // TODO: Use sumamries to get alt text
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                videoNode.type(ctx).create({ src: src, alt: alt }),
              ));
            } else if (isAudio(finalFile.type)) {
              const alt = finalFile.name;
              const res = await http.post('/api/transcription/send', data);
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                audioNode.type(ctx).create({ src: src, alt: res.data.summary || finalFile.name }),
              ));
            } else {
              const data = new FormData();
              data.append("image", finalFile);
              const res = await http.post('/api/description/send', data);
              dispatch(tr.replaceWith(
                selection.from,
                selection.to,
                customImageNode.type(ctx).create({ src: src, alt: res.data.summary || finalFile.name }),
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
        const { width, height } = calculateImageDimensions({ width: imageData.width, height: imageData.height })
        image.src = URL.createObjectURL(file);
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
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
