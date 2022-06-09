import React, { useState, Suspense, useEffect } from 'react'

import Header from 'components/Header'

const UserTable = React.lazy(() => import('components/UserTable'))
const RestaurantTable = React.lazy(() => import('components/RestaurantTable'))
const ReviewTable = React.lazy(() => import('components/ReviewTable'))
const ReplyTable = React.lazy(() => import('components/ReplyTable'))

const AdminPanel = () => {
  const [type, setType] = useState('Users')
  const typeArray = ['Users', 'Restaurants', 'Reviews', 'Replies']
  const setNavBarType = (navtype) => {
    setType(navtype)
    localStorage.setItem('navbar', navtype)
  }
  useEffect(() => {
    const navtype = localStorage.getItem('navbar') || 'Users'
    setType(navtype)
  })
  return (
    <>
      <Header />
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div className="container mx-auto">
          <div className="flex content-center items-center justify-center h-full ">
            <div className="w-full px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 -mt-20 hover:-mt-24">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h3 className="text-xl">Admin Panel</h3>
                </div>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-left ">
                    {typeArray.map((item, index) => {
                      return (
                        <a
                          className={
                            'relative px-4 flex-grow flex-1 font-semibold text-lg ' +
                            (item === type
                              ? 'text-blueGray-900'
                              : 'text-blueGray-400')
                          }
                          onClick={() => setNavBarType(item)}
                          key={index}
                        >
                          {item}
                        </a>
                      )
                    })}
                  </div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <div
                      className={
                        'flex flex-wrap items-left mt-4 ' +
                        (type === 'Users' ? 'block' : 'hidden')
                      }
                    >
                      {/* users */}
                      <UserTable />
                    </div>
                    <div
                      className={
                        'flex flex-wrap items-left mt-4 ' +
                        (type === 'Restaurants' ? 'block' : 'hidden')
                      }
                    >
                      {/* restaurants */}
                      <RestaurantTable />
                    </div>
                    <div
                      className={
                        'flex flex-wrap items-left mt-4 ' +
                        (type === 'Reviews' ? 'block' : 'hidden')
                      }
                    >
                      {/* reviews */}
                      <ReviewTable />
                    </div>
                    <div
                      className={
                        'flex flex-wrap items-left mt-4 ' +
                        (type === 'Replies' ? 'block' : 'hidden')
                      }
                    >
                      {/* reply */}
                      <ReplyTable />
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminPanel
