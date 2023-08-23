import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const verifyApi = createApi({
  reducerPath: "verifyApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    verify: builder.query({
      query: ([token, authenticationToken]) =>
        `/verify/${token}/${authenticationToken}`,
    }),
  }),
});

export const { useVerifyQuery } = verifyApi;
