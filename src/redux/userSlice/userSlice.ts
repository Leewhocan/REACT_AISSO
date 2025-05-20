import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    role: "",
    userName: "",
    id: "",
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
  },
});

export const { setUser } = userSlice.actions;
export const selectUserRole = (state) => state.user.user.role;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
