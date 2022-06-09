import { userConstants } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './'

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getUserData,
  updateUserData,
  getUsers,
  delete: _delete,
}

function login(username, password) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ username }))

      userService.login(username, password).then(
        (user) => {
          dispatch(success(user))
          dispatch(alertActions.success('Login Successfully.'))
          resolve({
            success: 'ok',
            user: user,
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

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
}

function getUserData(userId) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request({ userId }))

      userService.getById(userId).then(
        (user) => {
          dispatch(success(user))
          resolve({
            user,
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

  function request(user) {
    return { type: userConstants.DETAIL_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.DETAIL_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.DETAIL_FAILURE, error }
  }
}

function logout() {
  userService.logout()
  return { type: userConstants.LOGOUT }
}

function register(user) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(user))

      userService.register(user).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('You Have Registered Successfully.'))
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

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error }
  }
}

function updateUserData(user) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(user))

      userService.update(user).then(
        (data) => {
          dispatch(success())
          dispatch(alertActions.success('Update User Data Successfully'))
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

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error }
  }
}

function getUsers(userType) {
  return (dispatch) => {
    return new Promise((resolve) => {
      userService.getUsers(userType).then(
        (users) => {
          resolve({
            success: 'ok',
            users,
          })
        },
        (error) => {
          dispatch(alertActions.error('Getting Data Failed'))
        },
      )
    })
  }
}

function getAll(page, pageSize) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request())

      userService.getAll(page, pageSize).then(
        (users) => {
          dispatch(success(users))
          resolve({
            success: 'ok',
            users,
          })
        },
        (error) => {
          dispatch(alertActions.error('Getting User Data Failed'))
          dispatch(failure(error.toString()))
        },
      )
    })
  }

  function request() {
    return { type: userConstants.GETALL_REQUEST }
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users }
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error }
  }
}

// Prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch(request(id))

      userService.delete(id).then(
        (user) => {
          dispatch(success(id))
          dispatch(alertActions.success('One User Data Deleted Successfully.'))
          resolve({
            success: 'ok',
          })
        },
        (error) => {
          dispatch(failure(id, error.toString()))
          resolve({
            success: 'no',
          })
        },
      )
    })
  }

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id }
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id }
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error }
  }
}
