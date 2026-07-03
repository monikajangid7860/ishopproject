import { configureStore } from "@reduxjs/toolkit";
import   CartReducer  from "../reducer/CartReducer";
import   UserReducer  from "../reducer/UserReducer";
import WishReducer from "../reducer/WishReducer"
import RecentlyViewedSlice from "../reducer/RecentlyViewedSlice";

const store = configureStore({
  reducer: {
    "cart": CartReducer,
    "user": UserReducer,
    "wish":WishReducer,
    
"recentlyViewed": RecentlyViewedSlice,
  },
});

export default store;
