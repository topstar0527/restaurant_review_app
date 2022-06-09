import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import { useDispatch } from 'react-redux'
import { replyActions } from 'redux/_actions'

const RestaurantCard = ({ item }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [replyCount, setReplyCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(replyActions.getByRestaurant(item.id)).then((res) => {
      if (res.success === 'ok') {
        setReplyCount(res.replies.length)
      } else {
        setReplyCount(0)
      }
    })
  }, [])

  return (
    <Link
      to={'/restaurantdetail/' + item.id}
      className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 pb-32 mr-auto ml-auto -mt-20 hover:-mt-24"
    >
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500 hover:text-white">
        <img
          alt="..."
          src={item.image}
          className="w-full align-middle rounded-t-lg"
        />
        <div className="w-full flex flex-col relative text-lg">
          <div className="text-right ">
            <StarRatings
              rating={item.ave_rating ? item.ave_rating : 0}
              starDimension="30px"
              starSpacing="3px"
              starRatedColor="#ffd700"
            />
          </div>
          <p className="text-right font-light mt-1 text-sm">
            {item.review_count} review(s)
          </p>
          <p
            className={
              'text-right font-light mt-1 text-sm ' +
              (user.role === 'owner' ? 'block' : 'hidden')
            }
          >
            {item.review_count - replyCount} pending review(s)
          </p>
        </div>

        <blockquote className="relative p-8 mb-4 text-center">
          <h4 className="text-xl font-bold ">{item.name}</h4>
        </blockquote>
      </div>
    </Link>
  )
}

export default RestaurantCard
