import { userConstants } from '../_constants'

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
      }
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users.res,
        totalCount: action.users.totalCount,
      }
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error,
      }
    case userConstants.DELETE_REQUEST:
      // Add 'deleting:true' property to user being deleted
      return {
        ...state,
        items:
          state.items &&
          state.items.map((user) =>
            user.id === action.id ? { ...user, deleting: true } : user,
          ),
      }
    case userConstants.DELETE_SUCCESS:
      // Remove deleted user from state
      return {
        items:
          state.items && state.items.filter((user) => user.id !== action.id),
        totalCount: state.totalCount && state.totalCount - 1,
      }
    case userConstants.DELETE_FAILURE:
      // Remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // Make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user
            // Return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error }
          }

          return user
        }),
      }
    default:
      return state
  }
}
