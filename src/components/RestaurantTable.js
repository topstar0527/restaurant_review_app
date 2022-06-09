import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { restaurantActions } from 'redux/_actions'
import Pagination from './Pagination'

const RestaurantTable = ({}) => {
  const allRestaurants = useSelector((state) => state.restaurants)

  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const onSetPage = (page) => {
    setPage(page)
    localStorage.setItem('restpage', page)
  }

  useEffect(() => {
    const params =
      'page=' + page + '&limit=' + pageSize + '&minaverating=0&maxaverating=5'
    dispatch(restaurantActions.getAll(params))

    if (localStorage.getItem('restpage')) {
      setPage(parseInt(localStorage.getItem('restpage')))
    }
  }, [page])

  const handleDeleteRestaurant = (id) => {
    dispatch(restaurantActions.delete(id)).then((res) => {
      if (res.success === 'ok') {
        const params =
          'page=' +
          page +
          '&limit=' +
          pageSize +
          '&minaverating=0&maxaverating=5'
        dispatch(restaurantActions.getAll(params))
      }
    })
  }

  return (
    <>
      <div className="block w-full overflow-x-auto">
        {/* table */}
        <table className="text-left w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                No
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Restaurant Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Owner User Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Reviews
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Average Rating
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Action
              </th>
            </tr>
          </thead>
          {allRestaurants.loading && <em>Loading restaurants...</em>}
          {allRestaurants.error && (
            <span className="text-red">Error: {allRestaurants.error}</span>
          )}
          {allRestaurants.items && (
            <tbody>
              {allRestaurants.items.map((restData, index) => {
                return (
                  <tr key={index} className="border-b border-blueGray-300 ">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {index + 1 + (page - 1) * pageSize}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {restData.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {restData.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {restData.review_count}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {restData.ave_rating ? restData.ave_rating.toFixed(1) : 0}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className="mr-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Edit
                        </span>
                        <Link to={'/restupdate/' + restData.id}>
                          {' '}
                          <i className="fas fa-edit"></i>{' '}
                        </Link>{' '}
                      </span>
                      <span className="ml-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Delete
                        </span>
                        <a
                          onClick={() => handleDeleteRestaurant(restData.id)}
                          className="text-red "
                        >
                          {' '}
                          <i className="far fa-trash-alt"></i>{' '}
                        </a>
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      {allRestaurants.items && (
        <Pagination
          count={allRestaurants.totalCount}
          page={page}
          pageSize={pageSize}
          onSetPage={(page) => onSetPage(page)}
        />
      )}
    </>
  )
}

export default RestaurantTable
