import { authHeader } from '../_helpers'

export const replyService = {
  getAll,
  delete: _delete,
  getByRestaurant,
  create,
  update,
  getById,
}

const REACT_APP_GLOBAL_SERVER_URL = process.env.REACT_APP_GLOBAL_SERVER_URL

function update(reply) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(reply),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/replies/${reply.id}`,
    requestOptions,
  ).then(handleResponse)
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${REACT_APP_GLOBAL_SERVER_URL}/replies/${id}`, requestOptions)
    .then(handleResponse)
    .then((reply) => {
      return reply
    })
}

function getAll(page, pageSize) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/replies?page=${page}&limit=${pageSize}`,
    requestOptions,
  ).then(handleResponse)
}

function getByRestaurant(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/replies/filterbyrest/${id}`,
    requestOptions,
  )
    .then(handleResponse)
    .then((user) => {
      return user
    })
}

function create(reply) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(reply),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/replies/add`,
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
    `${REACT_APP_GLOBAL_SERVER_URL}/replies/${id}`,
    requestOptions,
  ).then(handleResponse)
}

function logout() {
  // Remove user from local storage to log user out
  localStorage.removeItem('user')
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
