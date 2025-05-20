import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../entities/Auth/Services/UserApi";
import { filterApi } from "../entities/Filters/Services/FilterApi";
import userReducer from "./userSlice/userSlice";
import filterReducer from "./filterSlice/filterSlice";
import { contractApi } from "../entities/Contracts/Services/ContractApi";
import { agreementApi } from "../entities/Agreement/Services/AgreementApi";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [agreementApi.reducerPath]: agreementApi.reducer,
    user: userReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(filterApi.middleware)
      .concat(contractApi.middleware)
      .concat(agreementApi.middleware),
});
