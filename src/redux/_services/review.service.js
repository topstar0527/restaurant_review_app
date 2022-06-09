import { authHeader } from '../_helpers'

export const reviewService = {
  getAll,
  delete: _delete,
  create,
  getById,
  update,
  getByRestId,
}

const REACT_APP_GLOBAL_SERVER_URL = process.env.REACT_APP_GLOBAL_SERVER_URL

function getAll(page, pageSize) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/reviews?page=${page}&limit=${pageSize}`,
    requestOptions,
  ).then(handleResponse)
}

function create(review) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/reviews/add`,
    requestOptions,
  ).then(handleResponse)
}

function getByRestId(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/reviews/filterbyrest/${id}`,
    requestOptions,
  )
    .then(handleResponse)
    .then((reviews) => {
      return reviews
    })
}

// Prefixed function name with underscore because delete is a reserved word in javascript

function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/reviews/${id}`,
    requestOptions,
  ).then(handleResponse)
}

function update(review) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  }

  return fetch(
    `${REACT_APP_GLOBAL_SERVER_URL}/reviews/${review.id}`,
    requestOptions,
  ).then(handleResponse)
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${REACT_APP_GLOBAL_SERVER_URL}/reviews/${id}`, requestOptions)
    .then(handleResponse)
    .then((review) => {
      return review
    })
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
