import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../../shared/helpers/helper";
export const contractApi = createApi({
  reducerPath: "contractApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/contracts",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getLastContracts: build.query({
      query: (filters) => ({
        url: `/?country=${filters.country}&tnved=${filters.good}`,
        method: "GET",
      }),
    }),
    getById: build.query({
      query: (contractId) => ({
        url: `one?contractId=${contractId}`,
        method: "GET",
      }),
    }),
    createContract: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    deleteContract: build.mutation({
      query: (body) => ({
        url: "/",
        method: "DELETE",
        body,
      }),
    }),
    updateContract: build.mutation({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
    }),
    getByProfile: build.query({
      query: (body) => ({
        url: `auth`,
        method: "POST",
        body: {
          status: body,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetLastContractsQuery,
  useGetByIdQuery,
  useCreateContractMutation,
  useDeleteContractMutation,
  useUpdateContractMutation,
  useLazyGetByProfileQuery,
} = contractApi;
