export function authHeader() {
  // Return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'))
  let token = localStorage.getItem('access_token')

  if (user && token) {
    return { Authorization: 'Bearer ' + token }
  } else {
    return {}
  }
}
