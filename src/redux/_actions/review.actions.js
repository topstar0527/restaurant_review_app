import { reviewConstants } from '../_constants'
import { reviewService } from '../_services'
import { alertActions } from './'

export const reviewActions = {
  getAll,
  delete: _delete,
  create,
  getRviewData,
  clear,
  getById,
  updateReviewData,
}

function getAll(page, pageSize) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request())

      reviewService.getAll(page, pageSize).then(
        (reviews) => {
          dispatch(success(reviews))
          resolve({
            success: 'ok',
            reviews,
          })
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error('Error happens when getting Review data'))
        },
      )
    })
  }

  function request() {
    return { type: reviewConstants.GETALL_REQUEST }
  }
  function success(reviews) {
    return { type: reviewConstants.GETALL_SUCCESS, reviews }
  }
  function failure(error) {
    return { type: reviewConstants.GETALL_FAILURE, error }
  }
}

function create(review) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(review))

      reviewService.create(review).then(
        (data) => {
          dispatch(success())
          dispatch(
            alertActions.success('You Have Review Restaurant Successfully.'),
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

  function request(review) {
    return { type: reviewConstants.CREATE_REQUEST, review }
  }
  function success(review) {
    return { type: reviewConstants.CREATE_SUCCESS, review }
  }
  function failure(error) {
    return { type: reviewConstants.CREATE_FAILURE, error }
  }
}

function getRviewData(restaurantId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(restaurantId))

      reviewService.getByRestId(restaurantId).then(
        (reviews) => {
          dispatch(success(reviews))
          resolve({
            success: 'ok',
            reviews,
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

  function request(review) {
    return { type: reviewConstants.GETREVIEWS_REQUEST, review }
  }
  function success(reviews) {
    return { type: reviewConstants.GETREVIEWS_SUCCESS, reviews }
  }
  function failure(error) {
    return { type: reviewConstants.GETREVIEWS_FAILURE, error }
  }
}

function updateReviewData(review) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(review))

      reviewService.update(review).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('Review updated successfully!'))
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

  function request(review) {
    return { type: reviewConstants.UPDATE_REQUEST, review }
  }
  function success(review) {
    return { type: reviewConstants.UPDATE_SUCCESS, review }
  }
  function failure(error) {
    return { type: reviewConstants.UPDATE_FAILURE, error }
  }
}

function getById(reviewId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ reviewId }))

      reviewService.getById(reviewId).then(
        (review) => {
          dispatch(success(review))
          resolve({
            success: 'ok',
            review,
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

  function request(review) {
    return { type: reviewConstants.DETAIL_REQUEST, review }
  }
  function success(review) {
    return { type: reviewConstants.DETAIL_SUCCESS, review }
  }
  function failure(error) {
    return { type: reviewConstants.DETAIL_FAILURE, error }
  }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(id))

      reviewService.delete(id).then(
        (review) => {
          dispatch(
            alertActions.success('One Review Data Deleted Successfully.'),
          )
          dispatch(success(id))
          resolve({ success: 'ok' })
        },
        (error) => {
          dispatch(alertActions.error('Deleting Review Data Failure'))
          dispatch(failure(id, error.toString()))
          resolve({ success: 'no' })
        },
      )
    })
  }

  function request(id) {
    return { type: reviewConstants.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: reviewConstants.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: reviewConstants.DELETE_FAILURE, id, error }
  }
}

function clear() {
  return { type: reviewConstants.CLEAR }
}
