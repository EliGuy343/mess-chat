"use client"

import { Person2Outlined } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import React from 'react'

const Profile = () => {
  const {data: session} = useSession();
  const user = session?.user;

  return (
    <div className='profile-page'>
      <h1 className='text-heading3-bold'>Edit Your Profile</h1>
      <form className='edit-profile'>
        <div className='input'>
          <input
            type='text'
            placeholder='Username'
            className='input-field'
          />
          <Person2Outlined/>
        </div>
        <div className='flex items-end justify-between'>
          <img
            src={user?.profileImage || "/assets/person.jpg"}
            alt='profile picture'
            className='w-40 h-40 rounded-full'
          />
          <p
            className='text-body-bold'
          >
            Upload New Photo
          </p>
        </div>
        <button
          className='btn'
          type='submit'
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile