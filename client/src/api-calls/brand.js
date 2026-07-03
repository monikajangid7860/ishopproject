import { axiosApiInstance } from "@/helper/helper";

/* ================= GET ALL BRANDS ================= */
async function getBrands() {
  try {
    const response = await axiosApiInstance.get("/brand");

    if (response.data.flag === 1) {
      return response.data;
    }

    return {
      flag: 0,
      brands: [],
      imageUrl: "",
      message: "No brands found",
    };
  } catch (error) {
    console.error("Brand API Error:", error);

    return {
      flag: 0,
      brands: [],
      imageUrl: "",
      message: "API Error",
    };
  }
}

/* ================= GET BRAND BY ID ================= */
async function getBrandById(id) {
  try {
    const response = await axiosApiInstance.get(`/brand/${id}`);

    if (response.data.flag === 1) {
      return response.data;
    }

    return {
      flag: 0,
      brand: null,
      imageUrl: "",
      message: "Brand not found",
    };
  } catch (error) {
    console.error("Brand By ID Error:", error);

    return {
      flag: 0,
      brand: null,
      imageUrl: "",
      message: "API Error",
    };
  }
}

export { getBrands, getBrandById };