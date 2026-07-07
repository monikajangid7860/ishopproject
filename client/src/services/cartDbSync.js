import { axiosApiInstance } from "@/helper/helper";
import { loadCart } from "@/redux/reducer/CartReducer";

export async function syncCartToDB({ user, cart, dispatch }) {
  if (!user) return;
  console.log(user);

  const res = await axiosApiInstance.post("/cart/sync-cart", {
  user_id: user._id,
  cart_data: cart,
  source: "guest",
});

  const mergedItems =
    res.data?.cart?.items?.map((row) => ({
      id: row.product_id._id,
      name: row.product_id.name,
      image: row.product_id.thumbnail,
      final_price: row.product_id.final_price,
      original_price: row.product_id.original_price,
      quantity: row.quantity,
    })) || [];

  // 🔥 SAME IDEA AS lsToCart()
  dispatch(loadCart(mergedItems));

  return mergedItems;
}
