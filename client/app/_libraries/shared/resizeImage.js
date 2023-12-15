import FileResizer from "react-image-file-resizer";

export const resizeImage = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1200,
      1200,
      "JPEG",
      85,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      300,
      300,
    );
  });