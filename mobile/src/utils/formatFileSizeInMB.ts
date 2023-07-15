export const formatFileSizeInMB = (fileSizeInBytes: number) => {
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  return fileSizeInMB.toFixed(2);
};
