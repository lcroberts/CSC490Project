export const customUploader = async (files, schema) => {
  console.log("uploader running");
  const images = [];
  const videos = [];
  const audio = [];

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) {
      continue;
    }

    // You can handle whatever the file type you want, we handle image here.
    console.log(file.type);
    if (!file.type.includes("image")) {
      continue;
    }

    images.push(file);
  }

  const nodes = await Promise.all(
    images.map(async (image) => {
      const src = await YourUploadAPI(image);
      const alt = image.name;
      return schema.nodes.image.createAndFill({
        src,
        alt,
      });
    }),
  );

  return nodes;
};
