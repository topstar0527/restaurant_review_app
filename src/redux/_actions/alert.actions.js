import { alertConstants } from '../_constants'

export const alertActions = {
  success,
  error,
  warn,
  clear,
}

function success(message) {
  return { type: alertConstants.SUCCESS, message }
}

function warn(message) {
  return { type: alertConstants.WARN, message }
}

function error(message) {
  return { type: alertConstants.ERROR, message }
}

function clear() {
  return { type: alertConstants.CLEAR }
}
