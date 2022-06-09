import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user')) {
          // User is not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        } else {
          const current_user = JSON.parse(localStorage.getItem('user'))
          if (roles && roles.indexOf(current_user.role) === -1) {
            return <Redirect to={{ pathname: '/login' }} />
          }
        }
        // User logged in so return component
        return <Component {...props} />
      }}
    />
  )
}

export { PrivateRoute }
