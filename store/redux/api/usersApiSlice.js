import { USERS_URL } from '../../../constans/urls';
import { apiSlice } from '../api/apiSlices';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		checkAllowed: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth/check`,
				method: 'POST',
				body: data
			}),
		}),
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST'
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: USERS_URL,
				method: 'POST',
				body: data
			}),
		}),
		checkUserExist: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data?.userId}`,
				method: 'POST',
				body: {
					...data
				}
			})
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data
			})
		}),
		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5
		}),
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Users'],
		}),
		getUserDetails: builder.query({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
			}),
			providesTags: ['User'],
			keepUnusedDataFor: 5
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data._id}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['User', 'Users'],

		}),
		getUserUnits: builder.query({
			query: (data) => ({
				//url: `${USERS_URL}/units/${data.unitName}/customer/${data.customerId}`,
				url: `${USERS_URL}/units`,
				params: {
					pov: data?.pov,
					unitName: data?.unitName,
					customerId: data?.customerId,
				}
			}),
			keepUnusedDataFor: 5
		}),
	})
})

export const {
	useCheckAllowedMutation,
	useCheckUserExistMutation,
	useGetUserUnitsQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useGetUserDetailsQuery,
	useUpdateUserMutation
} = usersApiSlice;