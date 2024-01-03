import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _api_url from '../../api/_api_url';
import { IDev, IPartialDev } from '../../types/devs';
import { fetchingError, fetchingSuccess, startFetching } from '../slices/dev.slice';
import { DEV_API_KEY } from '../constant';

const authToken = sessionStorage.getItem('authToken');

export const devApi = createApi({
  reducerPath: DEV_API_KEY,
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
  tagTypes: ['devs'],
  endpoints: (builder) => ({
    updateDev: builder.mutation<IDev, { id: string } & Partial<IDev>>({
      query: (body) => ({
        url: `developers/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    deletDev: builder.mutation<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    unassignDev: builder.mutation<number, { id: string; roleId: string }>({
      query: ({ id, ...rest }) => ({
        url: `developers/unassign/${id}`,
        method: 'PATCH',
        body: { ...rest },
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    assignDev: builder.mutation<number, { developerId: string; roleId: string; clientId: string; jobId: string }>({
      query: ({ developerId, ...rest }) => ({
        url: `developers/assign/${developerId}`,
        method: 'PATCH',
        body: { ...rest },
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    bulkdeletDev: builder.mutation<IDev, { id: string[] }>({
      query: ({ id }) => ({
        url: `developers`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),

    addDev: builder.mutation<IDev, IPartialDev>({
      query: (dev) => ({
        url: 'developers',
        method: 'POST',
        body: dev,
      }),
      invalidatesTags: ['devs'],
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    getDevs: builder.query<IDev[], void>({
      query: () => ({
        url: 'developers',
        method: 'GET',
      }),

      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any) => {
        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },

      providesTags: (result, error) => (result ? [...result.map(({ id }) => ({ type: 'devs' as const, id })), 'devs'] : ['devs']),
    }),
    getDev: builder.query<IDev, { id: string }>({
      query: ({ id }) => ({
        url: `developers/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IDev) => {
        // const dispatch = useTypedDispatch();
        // dispatch({ type: SET_DEV, payload: response });
        return response;
      },
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any) => {
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
  useUpdateDevMutation,
  useAssignDevMutation,
  useUnassignDevMutation,
  useAddDevMutation,
  useDeletDevMutation,
  useGetDevQuery,
  useBulkdeletDevMutation,
  useGetDevsQuery,
} = devApi;
