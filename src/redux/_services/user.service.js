import { authHeader } from '../_helpers'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  getUsers,
  delete: _delete,
}

const REACT_APP_GLOBAL_SERVER_URL = process.env.REACT_APP_GLOBAL_SERVER_URL

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }

  return fetch(`${REACT_APP_GLOBAL_SERVER_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // Store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.data))
      localStorage.setItem('access_token', user.access_token)
      return user.data
    })
}

function logout() {
  // Remove user from local storage to log user out
  localStorage.removeItem('user')
  localStorage.removeItem('reviewpage')
  localStorage.removeItem('restpage')
  localStorage.removeItem('replypage')
  localStorage.removeItem('userpage')
  localStorage.removeItem('navbar')
  localStorage.removeItem('restlistpage')
  localStorage.removeItem('restlistleftvalue')
  localStorage.removeItem('restlistrightvalue')
  localStorage.removeItem('access_token')
}

function getAll(page, pageSize) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/users?page=${page}&limit=${pageSize}`,
    requestOptions,
  ).then(handleResponse)
}

function getUsers(userType) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/users/role/${userType}`,
    requestOptions,
  ).then(handleResponse)
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${REACT_APP_GLOBAL_SERVER_URL}/users/${id}`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user
    })
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/users/register`,
    requestOptions,
  ).then(handleResponse)
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/users/${user.id}`,
    requestOptions,
  ).then(handleResponse)
}

// Prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/users/${id}`,
    requestOptions,
  ).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout if 401 response returned from api
        logout()
      }

      const error =
        response.status !== 404
          ? (data && data.message) || response.statusText
          : ''
      return Promise.reject(error)
    }
    return data
  })
}
