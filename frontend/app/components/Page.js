import React, {useEffect, useContext} from 'react'

import DispatchContext from '../DispatchContext'

function Page(props) {
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    document.title = props.title
    dispatch({type: "changepage", data: props.name})
    window.scrollTo(0, 0)
  }, [])

  return(
    <>
      {props.children}
    </>
  )
}

export default Page