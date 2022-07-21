import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.airtable.com/v0/appuilRrhQ6k2ut3l/Projects?view=Grid%20view&",
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
      query: (props) =>
        `&pageSize=${props?.pageSize || 3}&${
          props?.offset ? "offset=" + props?.offset : ""
        }`,
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

export const { useGetProjectsQuery, useAddProjectMutation } = projectsApi;
