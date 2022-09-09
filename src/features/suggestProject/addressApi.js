// this gets the address and coords during project suggestion
import config from "../../app-config.json";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.URL.MAPBOX_URL.value}`,
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: (props) => {
        return `${props?.lng}, ${props?.lat}.json?country=US&access_token=${API_KEY}`;
      },
    }),
  }),
});

export default addressApi;
export const { useLazyGetAddressQuery } = addressApi;
