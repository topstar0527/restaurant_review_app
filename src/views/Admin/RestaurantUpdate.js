import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import axios from 'axios'

import { authHeader } from '../../redux/_helpers'
import {
  restaurantActions,
  userActions,
  alertActions,
} from '../../redux/_actions'
import Header from 'components/Header'

const RestaurantUpdate = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const restId = useParams().restId
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [ownerId, setOwnerId] = useState(0)
  const [options, setOptions] = useState()

  const {
    register,
    formState: { errors },
  } = useForm()

  const REACT_APP_GLOBAL_SERVER_URL = process.env.REACT_APP_GLOBAL_SERVER_URL
  const updateRestData = async () => {
    const restaurant = {
      id: restId,
      name: name,
      owner_id: ownerId,
      description: description,
      image: fileName,
    }
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      const res = await axios.post(
        `${REACT_APP_GLOBAL_SERVER_URL}/restaurants/file`,
        formData,
        {
          headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      restaurant.image = res.data
    }
    console.log('===============')
    console.log(restaurant)
    dispatch(restaurantActions.updateRestData(restaurant)).then((result) => {
      if (result && result.success === 'ok') {
        history.goBack()
      } else {
      }
    })
  }

  const setInitialValues = (users) => {
    if (users.length > 0) {
      var selectOptions = []
      users.map((user) => {
        const option = {
          value: user.id,
          label: user.username,
        }
        selectOptions.push(option)
      })
      setOptions(selectOptions)
    }
  }

  const getRestData = (id) => {
    dispatch(restaurantActions.getById(id)).then((res) => {
      if (res.success === 'ok') {
        setName(res.restaurant.name)
        setDescription(res.restaurant.description)
        setFileName(res.restaurant.image)
        setOwnerId(res.restaurant.owner_id)
      }
    })
  }

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(userActions.getUsers('owner')).then((res) => {
        if (res.success === 'ok') {
          setInitialValues(res.users)
        }
      })
    }

    getRestData(restId)
  }, [])

  const handleDeleteRestaurant = (id) => {
    dispatch(restaurantActions.delete(id))
    history.goBack()
  }

  const handleChnageOwner = (value) => {
    setOwnerId(value.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
    setFileName(URL.createObjectURL(e.target.files[0]))
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
                    <h3>Restaurant Detail Info</h3>
                  </div>
                  <form>
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
                        id="file"
                        name="file"
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
                        placeholder="Restaurant Name"
                        id="name"
                        name="name"
                        value={name}
                        {...register('name', {
                          required: true,
                          validate: (value) => value !== '',
                        })}
                        onChange={handleChangeName}
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
                        id="description"
                        name="description"
                        value={description}
                        {...register('description', {
                          required: true,
                          validate: (value) => value !== '',
                        })}
                        onChange={handleDescriptionChange}
                      />
                    </div>
                    {user.role === 'admin' && (
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Owner
                        </label>

                        <Select
                          value={
                            options &&
                            options.filter((op) => op.value === ownerId)
                          }
                          onChange={(value) => handleChnageOwner(value)}
                          options={options}
                        />
                      </div>
                    )}

                    <div className="flex flex-auto w-full text-center">
                      <div className="text-center mt-6 flex w-6/12 pr-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={updateRestData}
                        >
                          Update Restaurant
                        </a>
                      </div>
                      <div className="text-center mt-6 flex w-6/12 pl-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={() => handleDeleteRestaurant(restId)}
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

export default RestaurantUpdate
