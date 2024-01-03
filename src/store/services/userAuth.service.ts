import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfession } from '../../types/roles';
import _api_url from '../../api/_api_url';
import { IUser } from '../../types/user';
import { USER_API_KEY } from '../constant';

interface IRegister {
  user: {
    firstName: string;
    lastName: string;
    role?: IProfession;
    phoneNumber: string;
    password: string;
    email: string;
  };
}
type IResponseRg = {
  token: string;
  email: string;
  password: string;
};
type IResponseLg = { role: string; authTokenId: string };

export const userApi = createApi({
  reducerPath: USER_API_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: _api_url.getApiUrl(),
    // fetchFn: (url, options) => fetch(url, options).then((res) => res.json()),

    prepareHeaders: (headers, { getState }) => {
      const authToken = sessionStorage.getItem('auth_token');
      if (authToken) {
        headers.set('Authorization', authToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<IResponseLg, Omit<IResponseRg, 'token'> & { rememberMe: boolean; role?: IProfession }>({
      query: (user) => ({
        url: 'user/login',
        method: 'POST',
        body: user,
      }),
      transformErrorResponse: (response: any) => {
        if (!response?.data) {
          return 'Please Check your internet connection and try again later';
        }

        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    loginUserWithGoogle: builder.mutation<IResponseLg, { accessToken: string; role?: IProfession }>({
      query: ({ accessToken }) => ({
        url: 'user/login/google',
        method: 'POST',
        body: { accessToken },
      }),
      transformErrorResponse: (response: any) => {
        if (!response?.data) {
          return 'Please Check your internet connection and  later';
        }

        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    registerUserWithGoogle: builder.mutation<IResponseRg, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: 'user/register/google',
        method: 'POST',
        body: { accessToken },
      }),
      transformErrorResponse: (response: any) => {
        if (!response?.data) {
          return 'Please Check your internet connection and  later';
        }

        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
      // providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    whoami: builder.query<IUser, void>({
      query: () => ({
        url: `user/whoami`,
        method: 'GET',
      }),
    }),
    registerUser: builder.mutation<IResponseRg, IRegister>({
      query: (user) => ({
        url: 'user/register',
        method: 'POST',
        body: user,
      }),
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: any) => {
        if (!response?.data) {
          return 'Please Check your internet connection and  later';
        }

        const {
          data: {
            error: { message },
          },
        } = response;
        return Array.isArray(message) ? message.join(',') : message;
      },
    }),
    updateUser: builder.mutation<number, { role: IProfession }>({
      query: (user) => ({
        url: 'user/update',
        method: 'PATCH',
        body: { ...user },
      }),
      // Pick out errors and prevent nested properties in a hook or selector
    }),
    getUser: builder.query<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    getRoles: builder.query<IProfession[], void>({
      query: () => ({
        url: `user`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useWhoamiQuery,
  useLoginUserWithGoogleMutation,
  useGetRolesQuery,
  useRegisterUserWithGoogleMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
