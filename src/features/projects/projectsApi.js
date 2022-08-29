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
      query: (props = {}) => getQuery(props),
      providesTags: ["Projects"],
    }),
    getFilteredProjects: builder.query({
      // query: (props = {}) => getQuery,
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

const getQuery = ({ pageSize, offset, formula }) => {
  let query = `&pageSize=${
    pageSize || 100
  }&filterByFormula=NOT(%7BApproved%7D%20%3D%20'')`;

  if (offset) query += `&offset=${offset}`;
  // if (formula) {
  //   let neighborhoodString;
  //   let nameString;

  //   if (formula.neighborhood) {
  //     neighborhoodString =
  //       "OR(" +
  //       formula.neighborhood.map((n, i) => `{Neighborhood} = '${n}'`) +
  //       ")";
  //   }
  //   if (formula.name) {
  //     nameString = "OR(" + formula.name.map((t, i) => `{Title} = '${t}'`) + ")";
  //   }

  //   const formulaString = `AND(${neighborhoodString ? neighborhoodString : ""}
  //   ${neighborhoodString && nameString ? "," : ""}
  //   ${nameString ? nameString : ""})`;

  //   const encodedFormulaString = encodeURIComponent(formulaString);
  //   query += "&filterByFormula=" + encodedFormulaString;
  //   console.log(formulaString);
  // }

  // console.log(query);

  return query;
};
