import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../../shared/helpers/helper";
export const agreementApi = createApi({
  reducerPath: "agreementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/agreement",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    createAgreement: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
    }),
    getByExporter: build.mutation({
      query: (body) => ({
        url: `byExporter`,
        method: "POST",
        body,
      }),
    }),
    getByImporter: build.mutation({
      query: (body) => ({
        url: `contract`,
        method: "POST",
        body,
      }),
    }),
    subAgreement: build.mutation({
      query: (body) => ({
        url: `sub`,
        method: "POST",
        body,
      }),
    }),
    cancelAgreement: build.mutation({
      query: (body) => ({
        url: ``,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useCreateAgreementMutation,
  useGetByExporterMutation,
  useGetByImporterMutation,
  useSubAgreementMutation,
  useCancelAgreementMutation,
} = agreementApi;
