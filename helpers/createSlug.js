export const CreateSlug = (title) => {
  // remove non-aplphanumeric characters and convert to lowercase

  const cleanedTitle = title.trim().replace(/^\w\s/gi, "").toLowerCase();

  // replace spaces  with hyphens
  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};

/**
 * Dot to hyphen convater
 * for string data
 */

export const dotsToHyphens = (data) => {
  const result = data.replace(/\./g, "chatingapp520");
  return result;
};
/**
 * hyphen to dots convater
 * for string data
 */

export const hyphensToDots = (data) => {
  const result = data.replace(/chatingapp520/g, ".");
  return result;
};
