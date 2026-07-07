export function getThumbnail(product, imageUrl = "") {
  if (!product?.thumbnail) return "/placeholder.png";

  // New Cloudinary structure
  if (
    typeof product.thumbnail === "object" &&
    product.thumbnail?.url
  ) {
    return product.thumbnail.url;
  }

  // Old local images
  return `${imageUrl}main_images/${product.thumbnail}`;
}

export function getOtherImages(product, imageUrl = "") {
  if (!Array.isArray(product?.other_images)) return [];

  return product.other_images.map((img) => {
    if (typeof img === "object" && img?.url) {
      return img.url;
    }

    return `${imageUrl}other_images/${img}`;
  });
}