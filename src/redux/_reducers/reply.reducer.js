import { replyConstants } from '../_constants'

export function replies(state = {}, action) {
  switch (action.type) {
    case replyConstants.GETALL_REQUEST:
      return {
        loading: true,
      }
    case replyConstants.GETALL_SUCCESS:
      return {
        items: action.replies.res,
        totalCount: action.replies.totalCount,
      }
    case replyConstants.GETALL_FAILURE:
      return {
        error: action.error,
      }
    case replyConstants.DELETE_REQUEST:
      // Add 'deleting:true' property to reply being deleted
      return {
        ...state,
        items:
          state.items &&
          state.items.map((reply) =>
            reply.id === action.id ? { ...reply, deleting: true } : reply,
          ),
      }
    case replyConstants.DELETE_SUCCESS:
      // Remove deleted reply from state
      return {
        items:
          state.items && state.items.filter((reply) => reply.id !== action.id),
        totalCount: state.totalCount && state.totalCount - 1,
      }
    case replyConstants.DELETE_FAILURE:
      // Remove 'deleting:true' property and add 'deleteError:[error]' property to reply
      return {
        ...state,
        items: state.items.map((reply) => {
          if (reply.id === action.id) {
            // Make copy of reply without 'deleting:true' property
            const { deleting, ...replyCopy } = reply
            // Return copy of reply with 'deleteError:[error]' property
            return { ...replyCopy, deleteError: action.error }
          }

          return reply
        }),
      }
    case replyConstants.GETRESTAURANT_REQUEST:
      return {
        loading: true,
      }
    case replyConstants.GETRESTAURANT_SUCCESS:
      return {
        items: action.replies,
      }
    case replyConstants.GETRESTAURANT_FAILURE:
      return {
        error: action.error,
      }
    case replyConstants.CREATE_REQUEST:
      return { registering: true }
    case replyConstants.CREATE_SUCCESS:
      return {}
    case replyConstants.CREATE_FAILURE:
      return {}
    case replyConstants.CLEAR:
      return {}

    case replyConstants.UPDATE_REQUEST:
      return { updating: true }
    case replyConstants.UPDATE_SUCCESS:
      return {}
    case replyConstants.UPDATE_FAILURE:
      return {}

    case replyConstants.DETAIL_REQUEST:
      return {
        loading: true,
      }
    case replyConstants.DETAIL_SUCCESS:
      return {
        items: action.review,
      }
    case replyConstants.DETAIL_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}
