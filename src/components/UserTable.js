import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userActions } from 'redux/_actions'
import Pagination from './Pagination'

const UserTable = () => {
  const allUsers = useSelector((state) => state.users)
  const currentUser = useSelector((state) => state.authentication.user)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const dispatch = useDispatch()

  const onSetPage = (page) => {
    setPage(page)
    localStorage.setItem('userpage', page)
  }

  useEffect(() => {
    dispatch(userActions.getAll(page, pageSize))
    if (localStorage.getItem('userpage')) {
      setPage(parseInt(localStorage.getItem('userpage')))
    }
  }, [page])

  const handleDeleteUser = (id) => {
    dispatch(userActions.delete(id)).then((res) => {
      if (res.success === 'ok') dispatch(userActions.getAll(page, pageSize))
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
                First Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Last Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                UserName
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Role
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-2 whitespace-nowrap font-semibold bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Action
              </th>
            </tr>
          </thead>
          {allUsers.loading && <em>Loading users...</em>}
          {allUsers.error && (
            <span className="text-red">Error: {allUsers.error}</span>
          )}
          {allUsers.items && (
            <tbody>
              {allUsers.items.map((userData, index) => {
                return (
                  <tr key={index} className="border-b border-blueGray-300 ">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {index + 1 + (page - 1) * pageSize}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {userData.firstName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {userData.lastName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {userData.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {userData.role}
                    </td>
                    <td
                      className={
                        'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4' +
                        (userData.id === currentUser.id ? ' hidden' : ' block')
                      }
                    >
                      <span className="mr-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Edit
                        </span>
                        <Link to={'/userdetail/' + userData.id} className="">
                          <i className="fas fa-edit"></i>{' '}
                        </Link>
                      </span>
                      <span className="ml-2 has-tooltip">
                        <span className="-mt-4 -ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 ">
                          Delete
                        </span>
                        <a
                          href="#"
                          onClick={() => handleDeleteUser(userData.id)}
                          className="text-red"
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
      {allUsers.items && (
        <Pagination
          count={allUsers.totalCount}
          page={page}
          pageSize={pageSize}
          onSetPage={(page) => onSetPage(page)}
        />
      )}
    </>
  )
}

export default UserTable
