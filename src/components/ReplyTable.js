import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { replyActions } from 'redux/_actions'
import Pagination from './Pagination'

const ReplyTable = () => {
  const allReplies = useSelector((state) => state.replies)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const pageSize = 10

  const onSetPage = (page) => {
    setPage(page)
    localStorage.setItem('replypage', page)
  }
  useEffect(() => {
    dispatch(replyActions.getAll(page, pageSize))
    if (localStorage.getItem('replypage')) {
      setPage(parseInt(localStorage.getItem('replypage')))
    }
  }, [page])

  const handleDeleteReply = (id) => {
    dispatch(replyActions.delete(id)).then((res) => {
      if (res.success === 'ok') {
        dispatch(replyActions.getAll(page, pageSize))
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
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-normal font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Comment
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-normal font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Reply
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Restaurant Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Owner Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Action
              </th>
            </tr>
          </thead>
          {allReplies.loading && <em>Loading users...</em>}
          {allReplies.error && (
            <span className="text-red">Error: {allReplies.error}</span>
          )}
          {allReplies.items && (
            <tbody>
              {allReplies.items.map((item, index) => {
                return (
                  <tr key={index} className="border-b border-blueGray-300 ">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {index + 1 + (page - 1) * pageSize}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                      {item.comment}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4">
                      {item.reply}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <span className="mr-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Edit
                        </span>
                        <Link to={'/replydetail/' + item.id}>
                          {' '}
                          <i className="fas fa-edit"></i>{' '}
                        </Link>{' '}
                      </span>
                      <span className="ml-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Delete
                        </span>
                        <a
                          onClick={() => handleDeleteReply(item.id)}
                          className=""
                        >
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

      {allReplies.items && (
        <Pagination
          count={allReplies.totalCount}
          page={page}
          pageSize={pageSize}
          onSetPage={(page) => onSetPage(page)}
        />
      )}
    </>
  )
}

export default ReplyTable
