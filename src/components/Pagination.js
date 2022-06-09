import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Pagination = ({ count, page, pageSize, onSetPage }) => {
  const pageCount =
    count % pageSize === 0 ? count / pageSize : parseInt(count / pageSize) + 1
  page = page <= pageCount ? page : 1

  const handlePrevPage = () => {
    if (page > 1) onSetPage(page - 1)
  }

  const handleNextPage = () => {
    if (page < pageCount) onSetPage(page + 1)
  }
  return (
    <div className="bg-white px-4 py-3 block w-full overflow-x-auto flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between md:hidden">
        <p
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={handlePrevPage}
        >
          Previous
        </p>
        <p
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={handleNextPage}
        >
          Next
        </p>
      </div>
      <div className="hidden md:block flex-1 md:flex md:items-center md:justify-between">
        <div className="relative inline-flex items-center">
          <p className="">
            Showing{' '}
            <span className="font-medium font-bold">
              {count === 0 ? 0 : (page - 1) * pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium font-bold">
              {count > page * pageSize ? page * pageSize : count}
            </span>{' '}
            of <span className="font-medium font-bold">{count}</span> results
          </p>
        </div>
        <div className="relative inline-flex items-center ">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px align-right"
            aria-label="Pagination"
          >
            <p
              onClick={handlePrevPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-blueGray-300 bg-white text-sm font-medium text-blueGray-500 hover:bg-blueGray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </p>
            <span
              aria-current="page"
              className="z-10 bg-indigo-50 border-blueGray-500 text-blueGray-600 relative inline-flex items-center px-4 py-2  text-sm font-medium "
            >
              {page}
            </span>
            <span
              aria-current="page"
              className="z-10 bg-indigo-50 border-blueGray-500 text-blueGray-600 relative inline-flex items-center px-4 py-2  text-sm font-medium "
            >
              /
            </span>
            <span
              aria-current="page"
              className="z-10 bg-indigo-50 border-blueGray-500 text-blueGray-600 relative inline-flex items-center px-4 py-2  text-sm font-medium border"
            >
              {pageCount}
            </span>
            <p
              onClick={handleNextPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-blueGray-300 bg-white text-sm font-medium text-blueGray-500 hover:bg-blueGray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </p>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
