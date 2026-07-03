import { toast } from "react-toastify";
import axios from "axios";

/* ================= SLUG ================= */
function slugGenerator(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ================= TOAST ================= */

const GLOBAL_TOAST_ID = "GLOBAL_NOTIFY";

const notify = (msg, flag) => {
  toast.dismiss(GLOBAL_TOAST_ID);

  toast(msg, {
    toastId: GLOBAL_TOAST_ID,
    type: flag === 1 ? "success" : "error",
    autoClose: 2000,
    pauseOnHover: false,
    closeOnClick: true,
  });
};




/* ================= AXIOS INSTANCE (SESSION BASED) ================= */
const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 REQUIRED FOR SESSIONS
});

export { slugGenerator, notify, axiosApiInstance };
