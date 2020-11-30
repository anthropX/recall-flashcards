import React from 'react'

const NotFound = () => {
  return (
    <div className='not-found position-fixed d-flex justify-content-center align-items-center'>
      <div className='not-found-message position-relative d-flex align-items-center'>
        <h1 className='display-5 display-5-0 text-danger m-0 mt-0'>404</h1>
        <div className='vertical-line bg-danger mx-3' />
        <p className='lead m-0'>Requested page couldn&apos;t be found.</p>
      </div>
    </div>
  )
}

export default NotFound
