import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getStations: builder.query({
      query: ([location, limit, page]) =>
        `/api/v1/stations?countryCode=${location}&limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetStationsQuery } = api;
