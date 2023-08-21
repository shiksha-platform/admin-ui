//validate file
export const validateImage = (file: any) => {
  const allowedPaths = /(\.jpeg|\.png)$/i;
  if (
    !(
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      allowedPaths.exec(file?.name)
    )
  )
    return "Invalid file format, use .png or .jpg";
  if (file.size > 3000000) return "Max file size should be 3MB";
  return "no_error";
};
