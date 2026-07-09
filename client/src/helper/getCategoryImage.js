export function getCategoryImage(category, imageUrl = "") {
  if (!category?.image) return "/placeholder.png";

  // New Cloudinary format
  if (
    typeof category.image === "object" &&
    category.image?.url
  ) {
    return category.image.url;
  }

  // Old local images
  return `${imageUrl}${category.image}`;
}