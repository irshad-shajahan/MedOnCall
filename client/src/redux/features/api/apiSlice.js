import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl=import.meta.env.MODE==='development'?"http://localhost:8080/api":"/api"

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    headers.set('credentials', 'include')
    return headers;
  },
});
// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'user',
    'doctor',
    'doctors',
    'leave',
    'timeSlot',
    'appointments',
    'conversation',
    'messages',
    'secondUSer',
  ],
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
      invalidatesTags: ['user', 'doctor'],
    }),
    getUserDetails: builder.query({
      query: () => '/getUserData',
      providesTags: ['user','doctor'],
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
    docCheck: builder.query({
      query: () => '/doctor/getDocCheck',
      providesTags: ['doctor'],
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
    fetchDoctors: builder.query({
      query: (speciality) => `/doctor/fetchDoctors/${speciality}`,
      providesTags: ['doctors'],
    }),
    fetchSpecialities: builder.query({
      query: () => '/doctor/fetchSpecialities',
      providesTags: ['doctor', 'speciality'],
    }),
    updatePhone: builder.mutation({
      query: (data) => ({
        url: '/updatePhone',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    fetchDocLeaveDates: builder.query({
      query: () => '/doctor/fetchLeaveDates',
      providesTags: ['doctor', 'leave'],
    }),
    updateDocLeave: builder.mutation({
      query: (data) => ({
        url: '/doctor/updateLeave',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['doctor', 'leave'],
    }),
    removeLeave: builder.mutation({
      query: (data) => ({
        url: '/doctor/removeLeave',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['doctor', 'leave'],
    }),
    updateTimeSlot: builder.mutation({
      query: (data) => ({
        url: '/doctor/updateTimeSlot',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['doctor', 'timeSlot'],
    }),
    fetchTimeSlot: builder.query({
      query: () => '/doctor/fetchTimeSlot',
      providesTags: ['doctor', 'timeSlot'],
    }),
    fetchDoctorProfile: builder.query({
      query: (id) => `/doctorProfile/${id}`,
      providesTags: ['doctors'],
    }),
    // bookSlot: builder.mutation({
    //   query: (data) => ({
    //     url: '/bookSlot',
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: ['doctor', 'appointments'],
    // }),
    patientAppointments: builder.query({
      query: () => '/fetchAppointments',
      providesTags: ['appointments'],
    }),
    fetchConversation: builder.query({
      query: () => '/com/fetchConvo',
      providesTags: ['conversation'],
    }),
    fetchSecondUser: builder.query({
      query: (id) => `/com/fetchSecondUser/${id}`,
      providesTags: ['secondUSer'],
    }),
    fetchMessages: builder.query({
      query: (convoId) => `/com/getMessages/${convoId}`,
      providesTags: ['messages'],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/com/addMessage',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['messages'],
    }),
    createSession: builder.mutation({
      query: (data) => ({
        url: '/com/addConvo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['conversation','appointments'],
    }),
    endSession: builder.mutation({
      query: (data) => ({
        url: '/com/endConvo',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['conversation','appointments'],
    }),
    fetchDoctorAppointments: builder.query({
      query: () => '/doctor/fetchAppointments',
      providesTags: ['appointments'],
    }),
    fetchVideoToken: builder.query({
      query: (appointmentId) => `/com/generateToken/${appointmentId}`,
      providesTags: ['conversation'],
    }),
    submitReview: builder.mutation({
      query: (data) => ({
        url:'/submitFeedback',
        method:'POST',
        body:data
      }),
      invalidatesTags:['appointments']
    }),
    createCheckOutSession:builder.mutation({
      query:(data)=>({
        url:'/create-checkout-session',
        method:'POST',
        body:data
      })
    }),
    submitPrescription:builder.mutation({
      query:(data)=>({
        url:'/doctor/submitPrescription',
        method:'POST',
        body:data
      }),
      invalidatesTags:['appointments']
    }),
    doctorProfileData:builder.query({
      query: () => '/doctor/doctorProfileData',
      providesTags: ['doctor','appointments'],
    }),
    withdrawWalletAmount:builder.mutation({
      query:()=>({
        url:'/doctor/walletwithdraw',
        method:'PATCH',
      }),
      invalidatesTags:['doctor','appointments']
    }),
    updateUserProfile:builder.mutation({
      query:(data)=>({
        url:'/updateProfile',
        method:'PATCH',
        body:data
      }),
      invalidatesTags:['user']
    }),
    fetchAppointmentsCount:builder.query({
      query:()=>'/consultationCount',
      providesTags:['user','appointments']
    }),
    verifyPayment:builder.query({
      query:()=>'/verifyPayment',
      invalidatesTags: ['doctor', 'appointments'],
    }),
    dummyrefetchAppointments:builder.mutation({
        query:(data)=>({
        url:'/refetchAppntments',
        method:'POST',
        body:data
      }),
      invalidatesTags:['doctor', 'appointments']
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
  useSendMessageMutation,
  useCreateSessionMutation,
  useEndSessionMutation,
  useFetchDoctorAppointmentsQuery,
  useFetchVideoTokenQuery,
  useSubmitReviewMutation,
  useCreateCheckOutSessionMutation,
  useSubmitPrescriptionMutation,
  useDoctorProfileDataQuery,
  useWithdrawWalletAmountMutation,
  useUpdateUserProfileMutation,
  useFetchAppointmentsCountQuery,
  useVerifyPaymentQuery,
  useDummyrefetchAppointmentsMutation
} = apiSlice;
