/* eslint-disable */
import React, { useEffect, useState, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Nouislider from 'nouislider-react'

import Header from 'components/Header'
import { restaurantActions } from 'redux/_actions'
import 'nouislider/distribute/nouislider.css'
import Pagination from 'components/Pagination'

const RestaurantCard = React.lazy(() => import('components/RestaurantCard'))

const RestaurantList = () => {
  const startRange = 0
  const endRange = 5
  const user = JSON.parse(localStorage.getItem('user'))
  const userRole = user.role
  const dispatch = useDispatch()
  const restaurants = useSelector((state) => state.restaurants)
  const [leftHandler, setLeftHandler] = useState(startRange.toFixed(1))
  const [rightHandler, setRightHandler] = useState(endRange.toFixed(1))
  const [page, setPage] = useState(1)
  const pageSize = 6

  const onSetPage = (page) => {
    setPage(page)
    localStorage.setItem('restlistpage', page)
  }
  const handleSlider = (sliderVal) => {
    setLeftHandler((sliderVal[0] / 10).toFixed(1))
    setRightHandler((sliderVal[1] / 10).toFixed(1))
    localStorage.setItem('restlistleftvalue', (sliderVal[0] / 10).toFixed(1))
    localStorage.setItem('restlistrightvalue', (sliderVal[1] / 10).toFixed(1))
  }

  const handleChange = (e) => {
    e.target.name === 'leftHandle'
      ? setLeftHandler(e.target.value)
      : setRightHandler(e.target.value)
    const leftOrRightTaget =
      e.target.name === 'leftHandle'
        ? 'restlistleftvalue'
        : 'restlistrightvalue'
    localStorage.setItem(leftOrRightTaget, e.target.value)
  }

  const setListOption = () => {
    if (localStorage.getItem('restlistpage')) {
      setPage(parseInt(localStorage.getItem('restlistpage')))
    }
    if (localStorage.getItem('restlistleftvalue')) {
      setLeftHandler(
        parseFloat(localStorage.getItem('restlistleftvalue')).toFixed(1),
      )
    }
    if (localStorage.getItem('restlistrightvalue')) {
      setRightHandler(
        parseFloat(localStorage.getItem('restlistrightvalue')).toFixed(1),
      )
    }
  }
  useEffect(() => {
    const params =
      'page=' +
      page +
      '&limit=' +
      pageSize +
      '&minaverating=' +
      leftHandler +
      '&maxaverating=' +
      rightHandler
    if (userRole === 'user') {
      dispatch(restaurantActions.getAll(params))
    } else if (userRole === 'owner') {
      dispatch(restaurantActions.getRestDataByOwner(user.id, params))
    }

    setListOption()
  }, [page, leftHandler, rightHandler])

  return (
    <>
      <Header />
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center mb-6 ">
            <div
              className={
                'text-center -mt-20 ' +
                (userRole === 'owner' ? 'block' : 'hidden')
              }
            >
              <Link
                to="/addnewrestaurant"
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              >
                Add New Restaurant
              </Link>
            </div>
            <div className="text-center -mt-20 mx-auto">
              <input
                name="leftHandle"
                type="number"
                value={leftHandler}
                onChange={(e) => handleChange(e)}
                placeholder="left"
              />
              <input
                type="number"
                name="rightHandle"
                value={rightHandler}
                onChange={(e) => handleChange(e)}
                placeholder="right"
              />
              <Nouislider
                onChange={handleSlider}
                range={{ min: 0, max: 50 }}
                start={[leftHandler * 10, rightHandler * 10]}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-20">
            {restaurants.loading && <em>Loading restaurants...</em>}
            {restaurants.error && <span className="text-red">No data</span>}
            {restaurants.items &&
              restaurants.items.map((item, index) => {
                return (
                  <Suspense fallback={<div>Loading...</div>}>
                    <RestaurantCard item={item} key={index} />
                  </Suspense>
                )
              })}
          </div>
        </div>
      </section>
      <div className="-mt-24 md:-mt-20 relative">
        {restaurants.items && (
          <Pagination
            count={restaurants.totalCount}
            page={page}
            pageSize={pageSize}
            onSetPage={(page) => onSetPage(page)}
          />
        )}
      </div>
    </>
  )
}

export default RestaurantList
