import { isImage, splitToBaseAndExtension } from "@/lib/utils";
import { useNodeViewContext } from "@prosemirror-adapter/react"
import { useEffect, useState } from "react";

const MediaUploadButton = () => {
  const nodeViewContext = useNodeViewContext()
  const [finalFile, setFinalFile] = useState(null);

  useEffect(() => {
    if (!finalFile) {
      return;
    }

    const button = document.createElement("a");
    button.download = finalFile.name;
    button.href = URL.createObjectURL(finalFile);
    button.click();
  }, [finalFile]);

  const onChange = async (e) => {
    /** @type {File|null} */
    let file = e.target.files[0] || undefined;
    if (file) {
      if (isImage(file.type)) {
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
            const { base, extension } = splitToBaseAndExtension(file.name);
            // Now we have a `blob` containing webp data
            // Use the file rename trick to turn it back into a file
            const myImage = new File([blob], base + '.webp', { type: blob.type });
            setFinalFile(myImage);
          }, 'image/webp');
        }
      }
    }
  }

  return (
    <input
      onChange={onChange}
      type="file"
      className="media-upload w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
      accept="image/*, video/*, audio/*"
    />
  )
}

export default MediaUploadButton
