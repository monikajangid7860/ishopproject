import { axiosApiInstance } from "@/helper/helper"

async function getProducts(searchParams = {}) {
  const query = new URLSearchParams();

  if (searchParams.home) query.append("home", searchParams.home);
  if (searchParams.top) query.append("top", searchParams.top);
  if (searchParams.best) query.append("best", searchParams.best);
  if (searchParams.hot) query.append("hot", searchParams.hot);
  if (searchParams.status) query.append("status", searchParams.status);
  if (searchParams.featured) query.append("featured", searchParams.featured);
  if (searchParams.product_slug) query.append("product_slug", searchParams.product_slug);
  if (searchParams.stock) query.append("stock", searchParams.stock);
  

  // 👇 THIS IS FOR CATEGORY PAGE
  if (searchParams.category_slug) {
    query.append("category_slug", searchParams.category_slug);
  }

  if (searchParams.limit) query.append("limit", searchParams.limit);
  if (searchParams.colors) {
            query.append("colors", searchParams.colors);
        }
        if (searchParams.brands) {
            query.append("brands", searchParams.brands);
        }
        if (searchParams.sortby) {
            query.append("sortby", searchParams.sortby);
        }

  try {
    const response = await axiosApiInstance.get(
      `product?${query.toString()}`
    );

    if (response.data.flag === 1) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

async function getProductById(id) {
  try {
    console.log(id)
    const response = await axiosApiInstance.get(`product/${id}`);
    if (response.data.flag === 1) {
      return response.data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export { getProducts, getProductById };
