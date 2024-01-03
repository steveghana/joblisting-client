import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfession } from '../../types/roles';
import axios from 'axios';
import _api_url from '../../api/_api_url';
import { ClientFormDataState, IClient } from '../../types/client';
import { CLIENT_API_KEY } from '../constant';

interface IUser {
  email: string;
  password: string;
}

const authToken = sessionStorage.getItem('authToken');

const axiosInstance = axios.create({
  baseURL: _api_url.getApiUrl(),
  headers: {
    Authorization: authToken ? authToken : '',
  },
});
export const clientApi = createApi({
  reducerPath: CLIENT_API_KEY,
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
  tagTypes: ['client'],

  endpoints: (builder) => ({
    updateClient: builder.mutation<IClient, { id: string; data: IClient }>({
      query: ({ data, id }) => ({
        url: `client/${id}`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['client'],
    }),
    deletClient: builder.mutation<IClient, { id: string; roleIds: string[] }>({
      query: ({ id, roleIds }) => ({
        url: `client/${id}`,
        method: 'DELETE',
        body: roleIds,
      }),
      invalidatesTags: ['client'],
    }),

    addClient: builder.mutation<IClient, ClientFormDataState>({
      query: (client) => ({
        url: 'client',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['client'],

      transformResponse: (response: IClient) => {
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
    getClient: builder.query<IClient, { id: string }>({
      query: ({ id }) => ({
        url: `client/${id}`,
        method: 'GET',
      }),
      providesTags: ['client'],
    }),
    getClients: builder.query<IClient[], void>({
      query: () => ({
        url: 'client',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [...result.map(({ id }) => ({ type: 'client' as const, id })), 'client'] : ['client']),

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

export const { useUpdateClientMutation, useAddClientMutation, useDeletClientMutation, useGetClientsQuery, useGetClientQuery } = clientApi;
