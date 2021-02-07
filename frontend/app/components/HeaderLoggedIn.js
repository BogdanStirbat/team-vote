import React, {useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Axios from 'axios'

import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

function HeaderLoggedIn(props) {
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  const history = useHistory()
  const [notifications, setNotifications] = useState([])
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0)
  const [hideNotifications, setHideNotifications] = useState(false)

  async function loadNotifications() {
    try {
      const response = await Axios.get("http://localhost:3001/notifications", 
                                      {
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + state.user.token
                                        }
                                      })
      
      const retrievedNotifications = response.data
      const unreadNotificationsCount = retrievedNotifications.filter(n=> !n.seen).length
      setNotifications(retrievedNotifications)
      setUnreadNotificationsCount(unreadNotificationsCount)
    } catch(e) {
      console.log("Error loading notifications.")
      console.log(e)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  function logout(e) {
    e.preventDefault()

    dispatch({type: "logout"})
    history.push("/")
  }

  function toogleNotifications(e) {
    e.preventDefault()

    setHideNotifications(!hideNotifications)
  }

  function deleteNotification(e) {
    e.preventDefault()

    const notificationId = e.target.getAttribute("data-notification-id")
    console.log("Delete notification " + notificationId)
  }

  function markAsReadNotification(e) {
    e.preventDefault()

    const notificationId = e.target.getAttribute("data-notification-id")
    console.log("Mark as read notification " + notificationId)
  }

  return (
    <div className="centered">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/public/img/logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="navigation">
          <div className={state.pageName=="Home"? "navigation-item active": "navigation-item"}>
            <Link to="/">Home</Link>
          </div>
          <div className={state.pageName=="About"? "navigation-item active": "navigation-item"}>
            <Link to="/about">About</Link>
          </div>
          <div onClick={logout} className="avatar">
            <a href="#">
              <img src="/public/img/avatar-default.svg" alt="Avatar" />
            </a>
          </div>
          <div className="notifications-icon" onClick={toogleNotifications}>
            <img src="/public/img/notifications.svg" alt="Avatar" />
            {
              unreadNotificationsCount > 0 &&
              <div className="notification-count">
                <div className="count">{unreadNotificationsCount > 99? "99+": unreadNotificationsCount}</div>
              </div>
            }
            {
              notifications && notifications.length > 0 &&
                <div className={hideNotifications? "notifications-relative-positioning hidden": "notifications-relative-positioning"}>
                  <div className="notifications-area">
                    <>
                      {
                        notifications.map(notification => {
                          return (
                            <div className="notification">
                              <p>{notification.text}</p>
                              <div className="btn primary delete-button" data-notification-id={notification._id} onClick={deleteNotification}>Delete</div>
                              <div className="btn secundary mark-read-button" data-notification-id={notification._id}  onClick={markAsReadNotification}>Mark as read</div>
                            </div>
                          )
                        })
                      }
                    </>
                  </div>
                </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderLoggedIn