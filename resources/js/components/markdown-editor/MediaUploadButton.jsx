import { useNodeViewContext } from "@prosemirror-adapter/react"

const MediaUploadButton = () => {
  const nodeViewContext = useNodeViewContext()
  console.log(nodeViewContext);
  const onChange = (e) => {
    const file = e.target.files[0] || undefined;
    if (file) {
      console.log(file);
    }
  }
  return (
    <input
      onChange={onChange}
      type="file"
      className="media-upload my-20 w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
      accept="image/*, video/*, audio/*"
    />
  )
}

export default MediaUploadButton
