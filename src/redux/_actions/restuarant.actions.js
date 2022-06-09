import { restaurantConstants } from '../_constants'
import { restaurantService } from '../_services'
import { alertActions } from './'

export const restaurantActions = {
  getAll,
  delete: _delete,
  getRestDataByOwner,
  getById,
  clear,
  create,
  updateRestData,
}

function getAll(params) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request())

      restaurantService.getAll(params).then(
        (restaurants) => {
          dispatch(success(restaurants))
          resolve({
            success: 'ok',
            restaurants,
          })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error('Getting Restaurants Data Failed.'))
          resolve({
            success: 'no',
          })
        },
      )
    })
  }

  function request() {
    return { type: restaurantConstants.GETALL_REQUEST }
  }
  function success(restaurants) {
    return { type: restaurantConstants.GETALL_SUCCESS, restaurants }
  }
  function failure(error) {
    return { type: restaurantConstants.GETALL_FAILURE, error }
  }
}

function getRestDataByOwner(userId, params) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ userId }))

      restaurantService.getByOwnerId(userId, params).then(
        (restaurants) => {
          dispatch(success(restaurants))
          resolve({
            success: 'ok',
            restaurants,
          })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
          resolve({
            success: 'no',
          })
        },
      )
    })
  }

  function request() {
    return { type: restaurantConstants.GETALL_REQUEST }
  }
  function success(restaurants) {
    return { type: restaurantConstants.GETALL_SUCCESS, restaurants }
  }
  function failure(error) {
    return { type: restaurantConstants.GETALL_FAILURE, error }
  }
}

function getById(restaurantId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ restaurantId }))

      restaurantService.getById(restaurantId).then(
        (restaurant) => {
          dispatch(success(restaurant))
          resolve({
            success: 'ok',
            restaurant,
          })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
          resolve({
            success: 'no',
          })
        },
      )
    })
  }

  function request(restaurant) {
    return { type: restaurantConstants.DETAIL_REQUEST, restaurant }
  }
  function success(restaurant) {
    return { type: restaurantConstants.DETAIL_SUCCESS, restaurant }
  }
  function failure(error) {
    return { type: restaurantConstants.DETAIL_FAILURE, error }
  }
}

function create(restaurant) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(restaurant))
      restaurantService.create(restaurant).then(
        (data) => {
          dispatch(success())
          dispatch(
            alertActions.success('You Have Created Restaurant Successfully.'),
          )
          resolve({ success: 'ok' })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
          resolve({ success: 'no' })
        },
      )
    })
  }

  function request(restaurant) {
    return { type: restaurantConstants.CREATE_REQUEST, restaurant }
  }
  function success(restaurant) {
    return { type: restaurantConstants.CREATE_SUCCESS, restaurant }
  }
  function failure(error) {
    return { type: restaurantConstants.CREATE_FAILURE, error }
  }
}

// Prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(id))

      restaurantService.delete(id).then(
        (restaurant) => {
          dispatch(
            alertActions.success('One Restaurant Data Deleted Successfully.'),
          )
          dispatch(success(id))
          resolve({ success: 'ok' })
        },
        (error) => {
          dispatch(alertActions.error('Deleting Restaurant Data Failed'))
          dispatch(failure(id, error.toString()))
          resolve({ success: 'no' })
        },
      )
    })
  }

  function request(id) {
    return { type: restaurantConstants.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: restaurantConstants.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: restaurantConstants.DELETE_FAILURE, id, error }
  }
}
function updateRestData(restaurant) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(restaurant))

      restaurantService.update(restaurant).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('Update Restaurant Data Successfully'))
          resolve({ success: 'ok' })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
          resolve({ success: 'no' })
        },
      )
    })
  }

  function request(restaurant) {
    return { type: restaurantConstants.UPDATE_REQUEST, restaurant }
  }
  function success(restaurant) {
    return { type: restaurantConstants.UPDATE_SUCCESS, restaurant }
  }
  function failure(error) {
    return { type: restaurantConstants.UPDATE_FAILURE, error }
  }
}

function clear() {
  return { type: restaurantConstants.CLEAR }
}
