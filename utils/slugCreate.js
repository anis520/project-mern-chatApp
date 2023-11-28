export const createSlug = (string) => {
  const slug = string.toLowerCase().replace(/[^\w]/g, "-");
  return slug;
};

export const getPublicId = (url) => {
  return url.split("/")[url.split("/").length - 1].split(".")[0];
};
