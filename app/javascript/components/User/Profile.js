import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

function Profile({data, image}) {
  return (
    <>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='mt-2'>
          {image ? (
            <img src={image} alt="Profile" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='m-3'>
          <p className='fs-5 mb-2'>Name</p>
          <p className='fs-2 mb-0'>{data.name}</p>
        </div>
        <div className='m-3'>
          <p className='fs-5 mb-2'>introduction</p>
          <p className='fs-2 mb-0'>{data.introduction}</p>
        </div>
        <div>
          <Link to={"/user/" + data.id + "/edit"}>
            <div>
              <AiFillEdit />
            </div>
          </Link>
        </div>
      </div>
    </>
  
  )
}

export default Profile
