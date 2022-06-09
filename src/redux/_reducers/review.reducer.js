import { reviewConstants } from '../_constants'

export function reviews(state = {}, action) {
  switch (action.type) {
    case reviewConstants.GETALL_REQUEST:
      return {
        loading: true,
      }
    case reviewConstants.GETALL_SUCCESS:
      return {
        items: action.reviews.res,
        totalCount: action.reviews.totalCount,
      }
    case reviewConstants.GETALL_FAILURE:
      return {
        error: action.error,
      }
    case reviewConstants.DELETE_REQUEST:
      // Add 'deleting:true' property to review being deleted
      return {
        ...state,
        items:
          state.items &&
          state.items.map((review) =>
            review.id === action.id ? { ...review, deleting: true } : review,
          ),
      }
    case reviewConstants.DELETE_SUCCESS:
      // Remove deleted review from state
      return {
        items:
          state.items &&
          state.items.filter((review) => review.id !== action.id),
        totalCount: state.totalCount && state.totalCount - 1,
      }
    case reviewConstants.DELETE_FAILURE:
      // Remove 'deleting:true' property and add 'deleteError:[error]' property to review
      return {
        ...state,
        items: state.items.map((review) => {
          if (review.id === action.id) {
            // Make copy of review without 'deleting:true' property
            const { deleting, ...reviewCopy } = review
            // Return copy of review with 'deleteError:[error]' property
            return { ...reviewCopy, deleteError: action.error }
          }

          return review
        }),
      }
    case reviewConstants.CREATE_REQUEST:
      return { registering: true }
    case reviewConstants.CREATE_SUCCESS:
      return {}
    case reviewConstants.CREATE_FAILURE:
      return {}
    case reviewConstants.GETREVIEWS_REQUEST:
      return {
        loading: true,
      }
    case reviewConstants.GETREVIEWS_SUCCESS:
      return {
        items: action.reviews,
      }
    case reviewConstants.GETREVIEWS_FAILURE:
      return {
        error: action.error,
      }
    case reviewConstants.CLEAR:
      return {}

    case reviewConstants.UPDATE_REQUEST:
      return { updating: true }
    case reviewConstants.UPDATE_SUCCESS:
      return {}
    case reviewConstants.UPDATE_FAILURE:
      return {}

    case reviewConstants.DETAIL_REQUEST:
      return {
        loading: true,
      }
    case reviewConstants.DETAIL_SUCCESS:
      return {
        items: action.reviews,
      }
    case reviewConstants.DETAIL_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}
