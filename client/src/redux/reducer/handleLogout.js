import { logoutUser } from "@/redux/reducer/UserReducer";
import { clearCart } from "@/redux/reducer/CartReducer";
import { clearWish } from "@/redux/reducer/WishReducer";

export const handleLogout = (dispatch) => {
  dispatch(logoutUser());
  dispatch(clearCart());
  dispatch(clearWish());
};
