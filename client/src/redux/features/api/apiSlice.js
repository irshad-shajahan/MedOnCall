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
  tagTypes: ['user', 'doctor','doctors','leave','timeSlot','appointments','conversation','messages','secondUSer'],
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
      invalidatesTags: ['user','doctor'],
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
      query: (speciality) => `/doctor/fetchDoctors/${speciality}`,
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
    }),
    fetchDocLeaveDates:builder.query({
      query:() =>'/doctor/fetchLeaveDates',
      providesTags:['doctor','leave']
    }),
    updateDocLeave:builder.mutation({
      query:(data) =>({
        url:'/doctor/updateLeave',
        method:'POST',
        body:data,
      }),
      invalidatesTags:['doctor','leave']
    }),
    removeLeave:builder.mutation({
      query:(data)=>({
        url:'/doctor/removeLeave',
        method:'PATCH',
        body:data,
      }),
      invalidatesTags:['doctor','leave']
    }),
    updateTimeSlot:builder.mutation({
      query:(data) =>({
        url:'/doctor/updateTimeSlot',
        method:'PATCH',
        body:data
      }),
      invalidatesTags:['doctor','timeSlot']
    }),
    fetchTimeSlot:builder.query({
      query:()=>'/doctor/fetchTimeSlot',
     providesTags:['doctor','timeSlot']
    }),
    fetchDoctorProfile:builder.query({
      query:(id)=>`/doctorProfile/${id}`,
     providesTags:['doctors']
    }),
    bookSlot:builder.mutation({
      query:(data)=>({
        url:'/bookSlot',
        method:'POST',
        body:data
      }),
      invalidatesTags:['doctor','appointments']
    }),
    patientAppointments:builder.query({
      query:()=>'/fetchAppointments',
      providesTags:['appointments']
    }),
    fetchConversation:builder.query({
      query:()=>'/com/fetchConvo',
      providesTags:['conversation']
    }),
    fetchSecondUser:builder.query({
      query:(id)=>`/com/fetchSecondUser/${id}`,
      providesTags:['secondUSer']
    }),
    fetchMessages:builder.query({
      query:(convoId)=>`/com/getMessages/${convoId}`,
      providesTags:['messages']
    }),
    sendMessage:builder.mutation({
      query:(data)=>({
        url:'/com/addMessage',
        method:'POST',
        body:data
      }),
      invalidatesTags:['messages']
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
  useUpdatePhoneMutation,
  useUpdateDocLeaveMutation,
  useFetchDocLeaveDatesQuery,
  useRemoveLeaveMutation,
  useFetchTimeSlotQuery,
  useUpdateTimeSlotMutation,
  useFetchDoctorProfileQuery,
  useBookSlotMutation,
  usePatientAppointmentsQuery,
  useFetchConversationQuery,
  useFetchSecondUserQuery,
  useFetchMessagesQuery,
  useSendMessageMutation
} = apiSlice;
