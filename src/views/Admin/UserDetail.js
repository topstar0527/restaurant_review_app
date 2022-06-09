import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import PasswordStrengthBar from 'react-password-strength-bar'

import { userActions, alertActions } from '../../redux/_actions'
import Header from 'components/Header'

const UserDetail = () => {
  const userId = useParams().userId
  const [username, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('user')
  const [currentUser, setCurrentUser] = useState()
  const dispatch = useDispatch()
  const history = useHistory()

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'owner', label: 'Owner' },
  ]

  const updateUserData = () => {
    if (firstName !== '' && lastName !== '') {
      let user = {
        id: userId,
        firstName,
        lastName,
        username,
        password,
        role: userRole,
      }
      dispatch(userActions.updateUserData(user)).then((res) => {
        if (res && res.success === 'ok') {
          history.push('/admin')
        }
      })
    } else {
      dispatch(alertActions.warn('Please Fill Fields'))
    }
  }

  const getUserData = (id) => {
    dispatch(userActions.getUserData(id)).then((data) => {
      setCurrentUser(data.user)
      setFirstName(data.user.firstName)
      setLastName(data.user.lastName)
      setUserName(data.user.username)
      setUserRole(data.user.role)
    })
  }

  useEffect(() => {
    getUserData(userId)
  }, [])

  const handleDeleteUser = (id) => {
    dispatch(userActions.delete(id))
    history.push('/admin')
  }

  return (
    <>
      <Header />
      <section className="relative py-16">
        <div className="container mt-48 mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <h3>User Detail Info</h3>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="First Name"
                        id="firstname"
                        name="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Last Name"
                        id="lasttname"
                        name="lasttname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        User Name
                      </label>
                      <input
                        disabled
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="User Name"
                        id="register-username"
                        name="register-username"
                        value={username}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="User Name"
                        id="register-username"
                        name="register-username"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {password && <PasswordStrengthBar password={password} />}
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Role
                      </label>
                      <Select
                        value={roleOptions.filter(
                          (op) => op.value === userRole,
                        )}
                        onChange={(value) => setUserRole(value.value)}
                        options={roleOptions}
                      />
                    </div>
                    <div className="flex flex-auto w-full text-center">
                      <div className="text-center mt-6 flex w-6/12 pr-4">
                        <Link
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={updateUserData}
                        >
                          Update Profile
                        </Link>
                      </div>
                      <div className="text-center mt-6 flex w-6/12 pl-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={() => handleDeleteUser(userId)}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserDetail
