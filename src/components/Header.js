/*eslint-disable*/

import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  userActions,
  restaurantActions,
  reviewActions,
  replyActions,
  alertActions,
} from 'redux/_actions'
import WalletModal from './WalletModal'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(userActions.logout())
    dispatch(restaurantActions.clear())
    dispatch(reviewActions.clear())
    dispatch(replyActions.clear())
    dispatch(alertActions.clear())

    history.push('/login')
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
      <nav className="top-0 absolute z-50 bg-white px-4 py-3 block w-full overflow-x-auto flex items-center justify-between border-t border-gray-200 sm:px-6 -mt-40">
        <div className="flex-1 flex justify-between">
          <a
            className="relative inline-flex items-center bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            onClick={goBack}
          >
            <i className="fas fa-arrow-left"></i>Back
          </a>
          <div className="flex flex-col items-center justify-center ">
            <WalletModal />
          </div>
          <a
            className=" relative inline-flex items-center bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> LOG OUT
          </a>
        </div>
      </nav>
    </>
  )
}

export default Header
