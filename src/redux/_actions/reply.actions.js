import { replyConstants } from '../_constants'
import { replyService } from '../_services'
import { alertActions } from './'

export const replyActions = {
  getAll,
  delete: _delete,
  getByRestaurant,
  create,
  clear,
  getById,
  updateReplyData,
}

function getAll(page, pageSize) {
  return (dispatch) => {
    dispatch(request())

    replyService.getAll(page, pageSize).then(
      (replies) => {
        dispatch(success(replies))
      },
      (error) => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error('Error happens when getting Reply data'))
      },
    )
  }

  function request() {
    return { type: replyConstants.GETALL_REQUEST }
  }
  function success(replies) {
    return { type: replyConstants.GETALL_SUCCESS, replies }
  }
  function failure(error) {
    return { type: replyConstants.GETALL_FAILURE, error }
  }
}

function getByRestaurant(restaurantId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(restaurantId))

      replyService.getByRestaurant(restaurantId).then(
        (replies) => {
          dispatch(success(replies))
          resolve({
            success: 'ok',
            replies,
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

  function request(reply) {
    return { type: replyConstants.GETRESTAURANT_REQUEST, reply }
  }
  function success(replies) {
    return { type: replyConstants.GETRESTAURANT_SUCCESS, replies }
  }
  function failure(error) {
    return { type: replyConstants.GETRESTAURANT_FAILURE, error }
  }
}
function updateReplyData(reply) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(reply))

      replyService.update(reply).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('Reply updated successfully!'))
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

  function request(reply) {
    return { type: replyConstants.UPDATE_REQUEST, reply }
  }
  function success(reply) {
    return { type: replyConstants.UPDATE_SUCCESS, reply }
  }
  function failure(error) {
    return { type: replyConstants.UPDATE_FAILURE, error }
  }
}

function getById(replyId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ replyId }))

      replyService.getById(replyId).then(
        (reply) => {
          dispatch(success(reply))
          resolve({
            success: 'ok',
            reply,
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

  function request(reply) {
    return { type: replyConstants.DETAIL_REQUEST, reply }
  }
  function success(reply) {
    return { type: replyConstants.DETAIL_SUCCESS, reply }
  }
  function failure(error) {
    return { type: replyConstants.DETAIL_FAILURE, error }
  }
}

function create(reply) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(reply))

      replyService.create(reply).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('You Have Replied Successfully.'))
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

  function request(reply) {
    return { type: replyConstants.CREATE_REQUEST, reply }
  }
  function success(reply) {
    return { type: replyConstants.CREATE_SUCCESS, reply }
  }
  function failure(error) {
    return { type: replyConstants.CREATE_FAILURE, error }
  }
}

// Prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(id))

      replyService.delete(id).then(
        (reply) => {
          dispatch(alertActions.success('One Reply Deleted Successfully.'))
          dispatch(success(id))
          resolve({ success: 'ok' })
        },
        (error) => {
          dispatch(alertActions.error('Deleting Reply Data Failure'))
          dispatch(failure(id, error.toString()))
          resolve({ success: 'no' })
        },
      )
    })
  }

  function request(id) {
    return { type: replyConstants.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: replyConstants.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: replyConstants.DELETE_FAILURE, id, error }
  }
}

function clear() {
  return { type: replyConstants.CLEAR }
}
