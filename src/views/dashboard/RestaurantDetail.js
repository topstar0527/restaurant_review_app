import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import StarRatingComponent from 'react-star-rating-component'
import DatePicker from 'react-datepicker'
import {
  restaurantActions,
  reviewActions,
  replyActions,
  alertActions,
} from 'redux/_actions'
import Header from 'components/Header'
import 'react-datepicker/dist/react-datepicker.css'

const RestaurantDetail = () => {
  const restaurantId = useParams().restaurantId
  const dispatch = useDispatch()

  const monthsName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const current_user = JSON.parse(localStorage.getItem('user'))
  const isOwner = current_user.role === 'owner'

  const [showAdd, setShowAdd] = useState(false)
  const [addAvailable, setAddAvailable] = useState(true) // false

  const [stars, setStars] = useState(0)
  const [commitMsg, setCommitMsg] = useState('')
  const [replyMsg, setReplyMsg] = useState('')
  const [visitDate, setVisitDate] = useState(new Date())
  const [avgRating, setAvgRating] = useState(0)
  const [maxRating, setMaxRating] = useState(0)
  const [minRating, setMinRating] = useState(0)

  const [restInfo, setRestInfo] = useState()
  const [reviewData, setReviewData] = useState()

  const cancelAddReview = () => {
    setShowAdd(false)
  }

  const getDateFormat = (visit_date) => {
    const d = new Date(visit_date)
    const newDateFormat =
      d.getDate() + ', ' + monthsName[d.getMonth()] + ', ' + d.getFullYear()
    return newDateFormat
  }

  const addReview = () => {
    if (stars === 0) {
      dispatch(alertActions.error('Please Rate Stars for this Restaurant'))
    } else if (commitMsg === '') {
      dispatch(alertActions.error('Please write comments for this Restaurant'))
    } else {
      const newReview = {
        rating: stars,
        comment: commitMsg,
        restaurant_id: restaurantId,
        user_id: current_user.id,
        visit_at: visitDate,
      }

      dispatch(reviewActions.create(newReview)).then((res) => {
        if (res && res.success === 'ok') {
          setAddAvailable(false)
          setShowAdd(false)
        }
      })
    }
  }

  const reply2Commit = (reviewId) => {
    if (replyMsg === '') {
      dispatch(alertActions.error('Please write reply message.'))
    } else {
      const newReply = {
        reply: replyMsg,
        review_id: reviewId,
        restaurant_id: restaurantId,
      }

      dispatch(replyActions.create(newReply)).then((res) => {
        if (res && res.success === 'ok') {
          setReplyMsg('')
        }
      })
    }
  }
  const ratingChanged = (newRating) => {
    setStars(newRating)
  }

  const getAvgMaxMin = (reviews) => {
    var sum = 0,
      min = 5,
      max = 0
    reviews.map((item) => {
      sum += item.rating
      if (min > item.rating) min = item.rating
      if (max < item.rating) max = item.rating
    })
    setAvgRating((sum / reviews.length).toFixed(1))
    setMaxRating(max)
    setMinRating(min)
  }

  useEffect(() => {
    // Read data- item
    dispatch(restaurantActions.getById(restaurantId)).then((restaurant) => {
      if (restaurant.success === 'ok') setRestInfo(restaurant.restaurant)
    })
  }, [])

  useEffect(() => {
    dispatch(reviewActions.getRviewData(restaurantId)).then((reviews) => {
      if (reviews.success === 'ok') {
        setReviewData(reviews.reviews)
        if (!isOwner) {
          reviews.reviews.find(
            ({ username }) => username === current_user.username,
          )
            ? setAddAvailable(false)
            : setAddAvailable(true)
        } else {
          setAddAvailable(false)
        }

        getAvgMaxMin(reviews.reviews)
      } else {
        setAddAvailable(!isOwner)
      }
    })
  }, [addAvailable, replyMsg])

  return (
    <>
      <Header />
      {restInfo && (
        <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100 ">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-10/12 md:w-8/12 px-12 md:px-4 mr-auto ml-auto -mt-20 hover:-mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src={restInfo.image}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-2 text-center">
                    <h4 className="text-xl font-bold ">{restInfo.name}</h4>
                  </blockquote>
                  <blockquote className="relative mb-2 text-center">
                    <h5 className="text-md font-bold ">
                      {restInfo.description}
                    </h5>
                  </blockquote>
                  <div className="flex flex-col space-y-8 mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="text-md text-light-blue-600 w-10/12 text-right">
                        Average Rating:
                      </div>
                      <div className="pl-4 text-2xl font-extrabold w-2/12">
                        {avgRating}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-md text-light-blue-600 w-10/12 text-right">
                        {' '}
                        Highest Rating:
                      </div>
                      <div className="pl-4 text-2xl w-2/12 font-extrabold">
                        {maxRating.toFixed(1)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-md text-light-blue-600 w-10/12 text-right">
                        {' '}
                        Lowest Rating:
                      </div>
                      <div className="pl-4 text-2xl w-2/12 font-extrabold">
                        {minRating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-10/12 md:w-3/12 lg:w-2/12 px-12 md:px-4 mr-auto ml-auto -mt-40">
                <div
                  className={
                    (isOwner ? 'block ' : 'hidden ') +
                    'text-right flex-auto p-5 '
                  }
                >
                  <Link
                    to={`/restupdate/${restaurantId}`}
                    className="bg-blueGray-400 text-blueGray-700 active:bg-blueGray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none hover:text-blueGray-300 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Edit
                  </Link>
                </div>
              </div>

              {/* // Add review */}
              <div className="w-10/12 md:w-3/12 lg:w-2/12 px-12 md:px-4 mr-auto ml-auto -mt-40">
                <div
                  className={
                    (addAvailable ? 'block ' : 'hidden ') +
                    'text-right flex-auto p-5 '
                  }
                >
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowAdd(true)}
                  >
                    +
                  </button>
                </div>
                <div className={(showAdd ? 'block ' : 'hidden ') + 'flex-auto'}>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <div className="relative w-full mb-3">
                    <textarea
                      rows="4"
                      cols="80"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                      onChange={(e) => setCommitMsg(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3 ">
                    <DatePicker
                      selected={visitDate}
                      onChange={(date) => setVisitDate(date)}
                      selectsStart
                      nextMonthButtonLabel=">"
                      previousMonthButtonLabel="<"
                    />
                  </div>

                  <div className="text-left flex flex-1 justify-between mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={addReview}
                    >
                      Add Review
                    </button>
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={cancelAddReview}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-10/12 md:w-3/12 lg:w-2/12 px-12 md:px-4 pb-32 mr-auto ml-auto -mt-40">
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <tbody>
                      {reviewData &&
                        reviewData.map((reviewItem, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                                  <p className="text-2xl">
                                    <StarRatingComponent
                                      value={reviewItem.rating}
                                      count={5}
                                      size={24}
                                      isHalf={true}
                                      activeColor="#ffd700"
                                      editing={false}
                                    />
                                  </p>
                                  <blockquote>
                                    <div className="flex-auto">
                                      <p className="text-xl font-blod mt-2 text-black text-right">
                                        Reviewer Name:{' '}
                                        <span className="text-2xl font-bold">
                                          {reviewItem.username}
                                        </span>
                                      </p>
                                      <p className="text-sm font-blod mt-2 text-black text-right">
                                        Visit Date:{' '}
                                        <span className="text-xl">
                                          {getDateFormat(reviewItem.visit_at)}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="mt-2">
                                      <span className="text-lg font-light text-black">
                                        {reviewItem.comment}
                                      </span>
                                    </div>
                                  </blockquote>
                                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                                </td>
                              </tr>
                              {reviewItem.reply && (
                                <tr>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                                    <div
                                      className={
                                        'relative text-left ' +
                                        (isOwner ? 'hidden' : 'block')
                                      }
                                    >
                                      <h4 className="text-xl">
                                        Replied by{' '}
                                        <span className="font-bold">
                                          {restInfo.ownername}{' '}
                                        </span>
                                      </h4>
                                    </div>
                                    <div className="flex-auto">
                                      <p className="text-lg font-blod mt-2 text-black text-right">
                                        {reviewItem.reply}
                                      </p>
                                    </div>
                                    <hr className="mt-6 border-b-1 border-blueGray-500" />
                                  </td>
                                </tr>
                              )}
                              <tr
                                className={
                                  isOwner && !reviewItem.reply
                                    ? 'block '
                                    : 'hidden '
                                }
                              >
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="relative w-full mb-3">
                                    <textarea
                                      rows="4"
                                      cols="80"
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                      placeholder="Type a Reply..."
                                      onChange={(e) =>
                                        setReplyMsg(e.target.value)
                                      }
                                    />
                                  </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => reply2Commit(reviewItem.id)}
                                  >
                                    Reply
                                  </button>
                                </td>
                                <hr className="mt-6 border-b-1 border-blueGray-500" />
                              </tr>
                              <tr className="border-b-2" />
                            </>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default RestaurantDetail
