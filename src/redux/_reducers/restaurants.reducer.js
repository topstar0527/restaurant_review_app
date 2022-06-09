import { restaurantConstants } from '../_constants'

export function restaurants(state = {}, action) {
  switch (action.type) {
    case restaurantConstants.GETALL_REQUEST:
      return {
        loading: true,
      }
    case restaurantConstants.GETALL_SUCCESS:
      return {
        items: action.restaurants.res,
        totalCount: action.restaurants.totalCount,
      }
    case restaurantConstants.GETALL_FAILURE:
      return {
        error: action.error,
      }
    case restaurantConstants.DELETE_REQUEST:
      // Add 'deleting:true' property to restaurant being deleted
      return {
        ...state,
        items:
          state.items &&
          state.items.map((restaurant) =>
            restaurant.id === action.id
              ? { ...restaurant, deleting: true }
              : restaurant,
          ),
      }
    case restaurantConstants.DELETE_SUCCESS:
      // Remove deleted restaurant from state
      return {
        items:
          state.items &&
          state.items.filter((restaurant) => restaurant.id !== action.id),
        totalCount: state.totalCount && state.totalCount - 1,
      }
    case restaurantConstants.DELETE_FAILURE:
      // Remove 'deleting:true' property and add 'deleteError:[error]' property to restaurant
      return {
        ...state,
        items: state.items.map((restaurant) => {
          if (restaurant.id === action.id) {
            // Make copy of restaurant without 'deleting:true' property
            const { deleting, ...restaurantCopy } = restaurant
            // Return copy of restaurant with 'deleteError:[error]' property
            return { ...restaurantCopy, deleteError: action.error }
          }

          return restaurant
        }),
      }
    case restaurantConstants.GETBYOWNER_REQUEST:
      return {
        loading: true,
      }
    case restaurantConstants.GETBYOWNER_SUCCESS:
      return {
        items: action.restaurant,
      }
    case restaurantConstants.GETBYOWNER_FAILURE:
      return {
        error: action.error,
      }
    case restaurantConstants.DETAIL_REQUEST:
      return {
        loading: true,
      }
    case restaurantConstants.DETAIL_SUCCESS:
      return {
        items: action.restaurants,
      }
    case restaurantConstants.DETAIL_FAILURE:
      return {
        error: action.error,
      }
    case restaurantConstants.CLEAR:
      return {}

    case restaurantConstants.CREATE_REQUEST:
      return { registering: true }
    case restaurantConstants.CREATE_SUCCESS:
      return {}
    case restaurantConstants.CREATE_FAILURE:
      return {}
    case restaurantConstants.UPDATE_REQUEST:
      return { updating: true }
    case restaurantConstants.UPDATE_SUCCESS:
      return {}
    case restaurantConstants.UPDATE_FAILURE:
      return {}
    default:
      return state
  }
}
