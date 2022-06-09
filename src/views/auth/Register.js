import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { userActions, alertActions } from '../../redux/_actions'
import PasswordStrengthBar from 'react-password-strength-bar'

const Register = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userRole, setUserRole] = useState('user')

  const dispatch = useDispatch()
  const history = useHistory()

  const { register, handleSubmit, formState, errors } = useForm()

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleConfirmChange = (e) => {
    setConfirm(e.target.value)
  }
  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'owner', label: 'Owner' },
  ]

  const onSubmit = () => {
    if (password !== confirm) {
      dispatch(alertActions.error('Confirm Password does not match.'))
    } else {
      const user = {
        firstName,
        lastName,
        username,
        password,
        role: userRole,
      }
      dispatch(userActions.register(user)).then((res) => {
        if (res && res.success === 'ok') {
          history.push('/login')
        }
      })
    }
  }

  useEffect(() => {
    dispatch(userActions.logout())
  }, [])

  return (
    <>
      <div className="container mt-48 mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h3>Sign Up With Credentials</h3>
                </div>
                <form action="/" onSubmit={handleSubmit(onSubmit)}>
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
                      {...register('firstname', {
                        required: true,
                        validate: (value) => value !== '',
                        pattern: /[A-Za-z]/,
                      })}
                      onChange={handleFirstNameChange}
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
                      id="lastname"
                      name="lastname"
                      {...register('lastname', {
                        required: true,
                        validate: (value) => value !== '',
                        pattern: /[A-Za-z]/,
                      })}
                      onChange={handleLastNameChange}
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
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="User Name"
                      id="username"
                      name="username"
                      {...register('username', {
                        required: true,
                        validate: (value) => value !== '',
                        pattern: /^[a-zA-Z0-9]+$/,
                      })}
                      onChange={handleUserNameChange}
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
                      placeholder="Password"
                      id="password"
                      name="password"
                      {...register('password', {
                        required: true,
                        validate: (value) => value !== '',
                      })}
                      onChange={handlePasswordChange}
                    />
                    {password && <PasswordStrengthBar password={password} />}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      id="confirm"
                      name="confirm"
                      {...register('confirm', {
                        required: true,
                        validate: (value) => value !== '',
                      })}
                      onChange={handleConfirmChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Role
                    </label>
                    <Select
                      value={roleOptions.filter((op) => op.value === userRole)}
                      onChange={(value) => setUserRole(value.value)}
                      options={roleOptions}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
                <span>If you have an account already, </span>
                <Link to="/login" className="text-lightBlue-500">
                  Login.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
