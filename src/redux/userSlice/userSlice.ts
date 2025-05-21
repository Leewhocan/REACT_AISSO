import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    role: "",
    userName: "",
    id: "",
    lan: "RU",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state.user.role = action.payload.role;
      state.user.userName = action.payload.userName;
      state.user.id = action.payload.id;
    },
    setLanguage: (state, action) => {
      state.user.lan = action.payload;
      localStorage.setItem("lan", action.payload);
    },
  },
});

export const { setUser, setLanguage } = userSlice.actions;
export const selectLanguage = (state) =>
  state.user.user.lan || localStorage.getItem("lan");
export const selectUserRole = (state) => state.user.user.role;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
