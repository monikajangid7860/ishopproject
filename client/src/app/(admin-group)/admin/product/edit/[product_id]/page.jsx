import ProductEdit from "@/components/admin/ProductEdit";

export default async function page({ params }) {
  const {product_id} = await params
  console.log(product_id)
  return <ProductEdit productId={product_id} />;
}
