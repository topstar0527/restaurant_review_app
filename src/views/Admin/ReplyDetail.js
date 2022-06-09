import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { replyActions, alertActions } from '../../redux/_actions'
import Header from 'components/Header'

const ReplyDetail = () => {
  const replyId = useParams().replyId
  const dispatch = useDispatch()
  const history = useHistory()
  const [reply, setReply] = useState('')
  const [comment, setCommnet] = useState('')
  const [reviewId, setReviewId] = useState(0)
  const [restaurantId, setRestaurantId] = useState(0)
  const [restaurantName, setRestaurantName] = useState('')

  const updateReplyData = () => {
    if (reply !== '') {
      const replydata = {
        id: replyId,
        review_id: reviewId,
        reply: reply,
        restaurant_id: restaurantId,
      }

      dispatch(replyActions.updateReplyData(replydata)).then((res) => {
        if (res && res.success === 'ok') {
          history.push('/admin')
        } else {
        }
      })
    } else {
      dispatch(alertActions.warn('Please Fill Fields'))
    }
  }

  const getReplyData = (id) => {
    dispatch(replyActions.getById(id)).then((res) => {
      if (res.success === 'ok') {
        setCommnet(res.reply.comment)
        setReply(res.reply.reply)
        setReviewId(res.reply.review_id)
        setRestaurantId(res.reply.restaurant_id)
        setRestaurantName(res.reply.name)
      }
    })
  }

  useEffect(() => {
    getReplyData(replyId)
  }, [])

  const handleDeleteReply = (id) => {
    dispatch(replyActions.delete(id))
    history.push('/admin')
  }

  return (
    <>
      <Header />
      <section className="relative py-16">
        <div className="container mt-48 mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <h3>Reply Detail Info</h3>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Comments
                      </label>

                      <textarea
                        disabled
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                        value={comment}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Reply
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Restaurant Name
                      </label>
                      <input
                        disabled
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="lasttname"
                        name="lasttname"
                        value={restaurantName}
                      />
                    </div>

                    <div className="flex flex-auto w-full text-center">
                      <div className="text-center mt-6 flex w-6/12 pr-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={updateReplyData}
                        >
                          Update Reply
                        </a>
                      </div>
                      <div className="text-center mt-6 flex w-6/12 pl-4">
                        <a
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="type"
                          onClick={() => handleDeleteReply(replyId)}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReplyDetail
