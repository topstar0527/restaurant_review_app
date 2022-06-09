import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import { PrivateRoute } from 'components/PrivateRoute'
import { Role } from 'redux/_helpers'
//
const Login = React.lazy(() => import('views/auth/Login'))
const Register = React.lazy(() => import('views/auth/Register'))

//
const RestaurantList = React.lazy(() =>
  import('views/dashboard/RestaurantList'),
)
const RestaurantDetail = React.lazy(() =>
  import('views/dashboard/RestaurantDetail'),
)
const AddRestaurant = React.lazy(() => import('views/dashboard/AddRestaurant'))

//
const AdminPanel = React.lazy(() => import('views/Admin/AdminPanel'))
const UserDetail = React.lazy(() => import('views/Admin/UserDetail'))
const RestaurantUpdate = React.lazy(() =>
  import('views/Admin/RestaurantUpdate'),
)
const ReviewDetail = React.lazy(() => import('views/Admin/ReviewDetail'))
const ReplyDetail = React.lazy(() => import('views/Admin/ReplyDetail'))

const App = () => {
  const toastData = useSelector((state) => state.alert)
  useEffect(() => {
    if (toastData && toastData.message !== '') {
      toastData.type === 'success'
        ? toast.success(toastData.message)
        : toast.error(toastData.message)
    }
  }, [toastData])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            path="/admin"
            component={AdminPanel}
            roles={[Role.Admin]}
          />
          <PrivateRoute
            exact
            path="/restaurantdetail/:restaurantId"
            component={RestaurantDetail}
          />
          <PrivateRoute
            exact
            path="/restaurantlist"
            component={RestaurantList}
          />
          <PrivateRoute
            path="/userdetail/:userId"
            component={UserDetail}
            roles={[Role.Admin]}
          />
          <PrivateRoute
            exact
            path="/addnewrestaurant"
            component={AddRestaurant}
          />
          <PrivateRoute
            exact
            path="/restupdate/:restId"
            component={RestaurantUpdate}
            roles={[Role.Admin, Role.Owner]}
          />
          <PrivateRoute
            exact
            path="/reviewdetail/:reviewId"
            component={ReviewDetail}
            roles={[Role.Admin]}
          />
          <PrivateRoute
            exact
            path="/replydetail/:replyId"
            component={ReplyDetail}
            roles={[Role.Admin]}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/" exact component={Login} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App
