import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* -------------------------------
       SET USER (LOGIN)
    -------------------------------- */
    setUser: (state, { payload }) => {
      state.user = payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(payload));
      }
    },

    /* -------------------------------
       LOAD USER FROM LOCALSTORAGE
    -------------------------------- */
    loadUserFromLS: (state) => {
      if (typeof window === "undefined") return;

      try {
        const lsData = localStorage.getItem("user");
        state.user = lsData ? JSON.parse(lsData) : null;
      } catch {
        state.user = null;
      }
    },

    /* -------------------------------
       LOGOUT USER
    -------------------------------- */
    logoutUser: (state) => {
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, loadUserFromLS, logoutUser } = userSlice.actions;
export default userSlice.reducer;
