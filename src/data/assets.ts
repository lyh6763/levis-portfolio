export const imagePath = (fileName: string) => {
  const optimizedName = fileName.replace(/\.[^.]+$/, '.webp');
  return `${import.meta.env.BASE_URL}images/optimized/${optimizedName}`;
};
