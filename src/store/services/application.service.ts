import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _api_url from '../../api/_api_url';
import { ApplicantsSubmission, IStatusApplication } from '../../types/roles';
import { APPLICATION_API_KEY } from '../constant';
import axios from 'axios';

const authToken = sessionStorage.getItem('authToken');

/**
 * Creates and exports an RTK Query API instance for making calls to the applicant API.
 * Uses createApi() from @reduxjs/toolkit/query/react to generate the API client.
 */
export const applicantApi = createApi({
  reducerPath: APPLICATION_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    headers: {
      Authorization: authToken ? authToken : '',
    },
    // fetchFn: (url, options) => fetch(url, options).then((res) => res.json()),
  }),
  tagTypes: ['applicants'],

  endpoints: (builder) => ({
    addApplicants: builder.mutation<ApplicantsSubmission, ApplicantsSubmission & { roleId: string }>({
      query: (body) => ({
        url: `applications`,
        method: 'POST',
        body,
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    deleteApplicant: builder.mutation<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`,
        method: 'DELETE',
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    bulkDeleteApplicant: builder.mutation<ApplicantsSubmission, { id: string[] }>({
      query: ({ id }) => ({
        url: `applications`,
        method: 'DELETE',
        body: id,
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    updateApplicant: builder.mutation<ApplicantsSubmission, { id: string; status: IStatusApplication }>({
      query: ({ id, status }) => ({
        url: `applications/${id}`,
        method: 'PATCH',
        body: { status },
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      invalidatesTags: ['applicants'],
    }),
    getApplicants: builder.query<ApplicantsSubmission[], { roleid: string }>({
      query: ({ roleid }) => ({
        url: `applications/all/${roleid}`,
        method: 'GET',
        // body: roleid,
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      providesTags: (result) => (result ? [...result.map(({ id }) => ({ type: 'applicants' as const, id })), 'applicants'] : ['applicants']),
    }),
    getApplicant: builder.query<ApplicantsSubmission, { id: string }>({
      query: ({ id }) => ({
        url: `applications/${id}`,
        method: 'GET',
      }),

      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return message;
      },
      providesTags: ['applicants'],
    }),
  }),
});

export const {
  useAddApplicantsMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
  useBulkDeleteApplicantMutation,
  useGetApplicantQuery,
  useGetApplicantsQuery,
} = applicantApi;
