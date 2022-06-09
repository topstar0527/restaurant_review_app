import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { authHeader } from '../../redux/_helpers'
import { restaurantActions, alertActions } from '../../redux/_actions'
import Header from 'components/Header'

const AddRestaurant = () => {
  const [restTitle, setRestTitle] = useState('')
  const [restDescription, setRestDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'))
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleTitleChange = (e) => {
    setRestTitle(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setRestDescription(e.target.value)
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
    setFileName(URL.createObjectURL(e.target.files[0]))
  }
  const REACT_APP_GLOBAL_SERVER_URL = process.env.REACT_APP_GLOBAL_SERVER_URL

  const onSubmit = () => {
    const formData = new FormData()
    formData.append('file', imageFile)
    axios
      .post(`${REACT_APP_GLOBAL_SERVER_URL}/restaurants/file`, formData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const newRestaurant = {
          owner_id: user.id,
          name: restTitle,
          description: restDescription,
          image: res.data,
        }
        dispatch(restaurantActions.create(newRestaurant)).then((res) => {
          if (res.success === 'ok') {
            history.push('/restaurantlist')
          }
        })
      })
  }

  useEffect(() => {}, [])

  return (
    <>
      <Header />
      <div className="container mt-48 mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h3>Add Restaurant</h3>
                </div>
                <form
                  action="/"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Restaurant Title"
                      id="register-title"
                      name="register-title"
                      {...register('register-title', {
                        required: true,
                        validate: (value) => value !== '',
                      })}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Restaurant Description
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Restaurant Description"
                      id="register-description"
                      name="register-description"
                      {...register('register-description', {
                        required: true,
                        validate: (value) => value !== '',
                      })}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Restaurant Image
                    </label>
                    <input
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Restaurant Title"
                      id="register-file"
                      name="register-file"
                      {...register('register-file', {
                        required: true,
                        validate: (value) => value !== '',
                      })}
                      onChange={handleFileChange}
                    />
                  </div>
                  {fileName && (
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500 hover:text-white mb-3">
                      <img
                        alt="..."
                        src={fileName}
                        className="w-full align-middle rounded-t-lg"
                      />
                    </div>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
                <Link to="/restaurantlist" className="text-black-200">
                  <small>Back</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRestaurant
