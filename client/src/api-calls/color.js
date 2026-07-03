import { axiosApiInstance } from "@/helper/helper";

/* -------------------------------
   GET ALL COLORS
-------------------------------- */
async function getColors() {
  try {
    const response = await axiosApiInstance.get("color");

    if (response.data.flag === 1) {
      return response.data; // ✅ return full payload
    }

    return { colors: [] };
  } catch (error) {
    console.error("getColors error:", error);
    return { colors: [] };
  }
}

/* -------------------------------
   GET COLOR BY ID
-------------------------------- */
async function getColorById(id) {
  try {
    if (!id) return null;

    const response = await axiosApiInstance.get(`color/${id}`);

    if (response.data.flag === 1) {
      return response.data; // ✅ contains { color }
    }

    return null;
  } catch (error) {
    console.error("getColorById error:", error);
    return null;
  }
}

export { getColorById, getColors };
