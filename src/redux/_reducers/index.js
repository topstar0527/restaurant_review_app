import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { restaurants } from './restaurants.reducer'
import { reviews } from './review.reducer'
import { replies } from './reply.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  restaurants,
  reviews,
  replies,
  alert,
})

export default rootReducer
