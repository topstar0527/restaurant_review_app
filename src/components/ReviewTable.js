import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { reviewActions } from 'redux/_actions'
import Pagination from './Pagination'

const ReviewTable = () => {
  const allreviews = useSelector((state) => state.reviews)

  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const onSetPage = (page) => {
    setPage(page)
    localStorage.setItem('reviewpage', page)
  }
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
  const getDateFormat = (visit_date) => {
    const d = new Date(visit_date)
    const newDateFormat =
      d.getDate() + ', ' + monthsName[d.getMonth()] + ', ' + d.getFullYear()
    return newDateFormat
  }

  useEffect(() => {
    dispatch(reviewActions.getAll(page, pageSize))
    if (localStorage.getItem('reviewpage')) {
      setPage(parseInt(localStorage.getItem('reviewpage')))
    }
  }, [page])

  const handleDeleteReview = (id) => {
    dispatch(reviewActions.delete(id)).then((res) => {
      if (res.success === 'ok') {
        dispatch(reviewActions.getAll(page, pageSize))
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
                Reviewer Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Restaurant Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Rating
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-normal font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Comment
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Visit Date
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Action
              </th>
            </tr>
          </thead>
          {allreviews.loading && <em>Loading reviews...</em>}
          {allreviews.error && (
            <span className="text-red">Error: {allreviews.error}</span>
          )}
          {allreviews.items && (
            <tbody>
              {allreviews.items.map((reviewData, index) => {
                return (
                  <tr key={index} className="border-b border-blueGray-300 ">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {index + 1 + (page - 1) * pageSize}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reviewData.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reviewData.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {reviewData.rating}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                      {reviewData.comment}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {getDateFormat(reviewData.visit_at)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className="mr-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Edit
                        </span>
                        <Link to={'/reviewdetail/' + reviewData.id}>
                          {' '}
                          <i className="fas fa-edit"></i>{' '}
                        </Link>{' '}
                      </span>
                      <span className="ml-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Delete
                        </span>
                        <a
                          onClick={() => handleDeleteReview(reviewData.id)}
                          className="text-red"
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
      {allreviews.items && (
        <Pagination
          count={allreviews.totalCount}
          page={page}
          pageSize={pageSize}
          onSetPage={(page) => onSetPage(page)}
        />
      )}
    </>
  )
}

export default ReviewTable
