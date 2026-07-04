import { getProductById } from "@/api-calls/products";
import ProductPageClient from "@/components/website/ProductPageClient";

export default async function Page({ params }) {
  const { product_id } = await params;
  

  if (!product_id) {
    return <div className="p-10">Invalid product URL</div>;
  }

  const res = await getProductById(product_id);

  if (!res?.flag || !res.product) {
    return <div className="p-10">Product not found</div>;
  }

  const { product, imageUrl } = res;
    console.log(product)
  // 🔥 NORMALIZED PRODUCT OBJECT (THIS IS KEY)
  const normalizedProduct = {
    id: product._id,
    title: product.name,
    slug: product.slug,
    brand: product.brand_id?.name,
    price: product.final_price,
    original_price: product.original_price,
    discount_percentage: product.discount_percentage,
    sku: product._id,
    stock: product.stock,
    description: product.description,

    // 👇 build images array correctly
    images: [
      `${imageUrl}main_images/${product.thumbnail}`,
      ...(product.other_images || []).map(
        (img) => `${imageUrl}other_images/${img}`
      ),
    ],
    other_images: [
      ...(product.other_images || []).map(
        (img) => `${imageUrl}other_images/${img}`
      ),
    ]
  };


return (
  <ProductPageClient
    product={normalizedProduct}
    description={product.description}
  />
);
}
