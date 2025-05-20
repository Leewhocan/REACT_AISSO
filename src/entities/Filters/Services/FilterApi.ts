import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../../shared/helpers/helper";
export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/filter",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTnved: build.query<unknown, void>({
      query: () => ({
        url: "tnved",
        method: "GET",
      }),
    }),
    getCountry: build.query<unknown, void>({
      query: () => ({
        url: "country",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTnvedQuery, useGetCountryQuery } = filterApi;
