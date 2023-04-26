import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/',
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    return headers;
  },
});
// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['user', 'doctor'],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user', 'doctor'],
    }),
    userGoogleLogin: builder.mutation({
      query: (data) => ({
        url: '/googleRegister',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    getUserDetails: builder.query({
      query: () => '/getUserData',
      providesTags: ['user'],
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
    docCheck: builder.query({
      query: () => '/doctor/getDocCheck',
      providesTags: ['doctor'],
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
    fetchDoctors: builder.query({
      query: ({speciality}) => `/doctor/fetchDoctors/${speciality}`,
      providesTags: ['doctors']
    }),
    fetchSpecialities: builder.query({
      query: () => '/doctor/fetchSpecialities',
      providesTags: ['doctor', 'speciality'],
    }),
    updatePhone:builder.mutation({
      query: (data) => ({
        url:'/updatePhone',
      method:'PATCH',
      body:data}),
      invalidatesTags:['user']
    })
  }),
});

export const {
  useGetUserDetailsQuery,
  useUserLoginMutation,
  useUserGoogleLoginMutation,
  useDocCheckQuery,
  useFetchDoctorsQuery,
  useFetchSpecialitiesQuery,
  useUpdatePhoneMutation
} = apiSlice;
