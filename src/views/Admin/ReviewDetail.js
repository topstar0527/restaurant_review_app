import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import StarRatingComponent from 'react-star-rating-component'

import {
  restaurantActions,
  reviewActions,
  userActions,
  alertActions,
} from '../../redux/_actions'
import Header from 'components/Header'

const ReviewDetail = () => {
  const reviewId = useParams().reviewId
  const dispatch = useDispatch()
  const history = useHistory()
  const [rating, setRating] = useState(0)
  const [comment, setCommnet] = useState('')
  const [userId, setUserId] = useState(0)
  const [restaurantId, setRestaurantId] = useState(0)
  const [userOptions, setUserOptions] = useState()
  const [restOptions, setRestOptions] = useState()

  const updateRestData = () => {
    if (comment !== '') {
      const restaurant = {
        id: reviewId,
        comment: comment,
        user_id: userId,
        rating: rating,
        restaurant_id: restaurantId,
      }

      dispatch(reviewActions.updateReviewData(restaurant)).then((res) => {
        if (res && res.success === 'ok') {
          history.push('/admin')
        }
      })
    } else {
      dispatch(alertActions.warn('Please Fill Fields'))
    }
  }

  const ratingChanged = (newRating) => {
    setRating(newRating)
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
      setUserOptions(selectOptions)
    }
  }

  const setInitialRestValues = (restaurants) => {
    if (restaurants.length > 0) {
      var selectOptions = []
      restaurants.map((restaurant) => {
        const option = {
          value: restaurant.id,
          label: restaurant.name,
        }
        selectOptions.push(option)
      })
      setRestOptions(selectOptions)
    }
  }

  const getReviewData = (id) => {
    dispatch(reviewActions.getById(id)).then((res) => {
      if (res.success === 'ok') {
        setRating(res.review.rating)
        setCommnet(res.review.comment)
        setUserId(res.review.user_id)
        setRestaurantId(res.review.restaurant_id)
      }
    })
  }

  useEffect(() => {
    dispatch(userActions.getUsers('user')).then((res) => {
      if (res.success === 'ok') {
        setInitialValues(res.users)
      }
    })
    const params = 'page=-1&limit=-1&minaverating=0&maxaverating=5'
    dispatch(restaurantActions.getAll(params)).then((data) => {
      if (data.success === 'ok') {
        setInitialRestValues(data.restaurants.res)
      }
    })
    getReviewData(reviewId)
  }, [])

  const handleDeleteReview = (id) => {
    dispatch(reviewActions.delete(id))
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
                    <h3>Review Detail Info</h3>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        User Name
                      </label>
                      <Select
                        value={
                          userOptions &&
                          userOptions.filter((op) => op.value === userId)
                        }
                        onChange={(value) => setUserId(value.value)}
                        options={userOptions}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Restaurant Name
                      </label>
                      <Select
                        value={
                          restOptions &&
                          restOptions.filter((op) => op.value === restaurantId)
                        }
                        onChange={(value) => setRestaurantId(value.value)}
                        options={restOptions}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Rating
                      </label>
                      <div className="text-xl">
                        <StarRatingComponent
                          name={'rating'}
                          value={rating}
                          starCount={5}
                          size={24}
                          isHalf={false}
                          onStarClick={ratingChanged}
                          activeColor="#ffd700"
                          editing={true}
                        />
                      </div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Comments
                      </label>

                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                        value={comment}
                        onChange={(e) => setCommnet(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-auto w-full text-center">
                      <div className="text-center mt-6 flex w-6/12 pr-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={updateRestData}
                        >
                          Update Review
                        </a>
                      </div>
                      <div className="text-center mt-6 flex w-6/12 pl-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={() => handleDeleteReview(reviewId)}
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

export default ReviewDetail
