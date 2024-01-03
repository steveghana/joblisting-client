import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfession } from '../../types/roles';
import axios from 'axios';
import _api_url from '../../api/_api_url';
import { Iinterviews, InterviewAdd, TInterviewComment } from '../../types/interviews';
import { INTERVEW_API_KEY } from '../constant';

const authToken = sessionStorage.getItem('authToken');
const axiosInstance = axios.create({
  baseURL: _api_url.getApiUrl(),
  headers: {
    Authorization: authToken ? authToken : '',
  },
});
export const interviewApi = createApi({
  reducerPath: INTERVEW_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      const authToken = sessionStorage.getItem('auth_token');
      if (authToken) {
        headers.set('Authorization', authToken);
      }
      return headers;
    },
    // fetchFn: (url, options) => fetch(url, options).then((res) => res.json()),
  }),
  tagTypes: ['interviews'],

  endpoints: (builder) => ({
    updateInterview: builder.mutation<number, { id: string; data: Omit<InterviewAdd, 'candidate' | 'interviewer'> }>({
      query: ({ data, id }) => ({
        url: `interviews/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['interviews'],
    }),
    deletInterview: builder.mutation<number, { id: string }>({
      query: ({ id }) => ({
        url: `interviews/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: number, meta) => {
        return response;
      },
      invalidatesTags: ['interviews'],
    }),

    addInterview: builder.mutation<Iinterviews, Omit<InterviewAdd, 'candidate' | 'interviewer'>>({
      query: (Interview) => ({
        url: 'interviews',
        method: 'POST',
        body: Interview,
      }),
      invalidatesTags: ['interviews'],
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    addInterviewComment: builder.mutation<TInterviewComment, TInterviewComment>({
      query: (Interview) => ({
        url: 'interviews/addComment',
        method: 'POST',
        body: Interview,
      }),
      invalidatesTags: ['interviews'],

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    getInterview: builder.query<Iinterviews, { id: string }>({
      query: ({ id }) => ({
        url: `interviews/${id}`,
        method: 'GET',
      }),
      providesTags: ['interviews'],
    }),
    getInterviews: builder.query<Iinterviews[], void>({
      query: () => ({
        url: 'interviews',
        method: 'GET',
      }),
      providesTags: (result, error) => (result ? [...result.map(({ id }) => ({ type: 'interviews' as const, id })), 'interviews'] : ['interviews']),

      transformErrorResponse: (response: any, meta, arg) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
  }),
});

export const {
  useUpdateInterviewMutation,
  useAddInterviewMutation,
  useAddInterviewCommentMutation,
  useDeletInterviewMutation,
  useGetInterviewsQuery,
  useGetInterviewQuery,
} = interviewApi;
