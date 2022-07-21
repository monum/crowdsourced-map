import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_MAPBOX_ACESS_TOKEN;

const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: (props) => {
        console.log(props);
        return `${props?.lng}, ${props?.lat}.json?country=US&access_token=${API_KEY}`;
      },
    }),
  }),
});

export default addressApi;
export const { useLazyGetAddressQuery } = addressApi;
