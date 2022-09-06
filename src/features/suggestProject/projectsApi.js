// this gets the projects data and submits the data for a suggested project
import config from "../../app-config.json";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.URL.AIRTABLE_URL.value}?view=Grid%20view&`,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      );

      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (props = {}) => getQuery(props),
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export default projectsApi;

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useLazyGetProjectsQuery,
} = projectsApi;

const getQuery = ({ pageSize, offset }) => {
  let query = `&pageSize=${
    pageSize || 100
  }&filterByFormula=NOT(%7BApproved%7D%20%3D%20'')`;

  if (offset) query += `&offset=${offset}`;

  return query;
};
