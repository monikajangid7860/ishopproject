export function getBrandImage(brand, imageUrl = "") {
  if (!brand?.image) return "/placeholder.png";

  // Cloudinary
  if (
    typeof brand.image === "object" &&
    brand.image?.url
  ) {
    return brand.image.url;
  }

  // Old local images
  return `${imageUrl}${brand.image}`;
}