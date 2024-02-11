import { Person2Outlined } from '@mui/icons-material'
import React from 'react'

const Profile = () => {
  return (
    <div className='profile-page'>
      <h1 className='text-heading3-bold'>Edit Your Profile</h1>
      <form className='edit-profile'>
        <div className='input'>
          <input type='text' placeholder='Username' className='input-field'/>
          <Person2Outlined/>
        </div>
      </form>
    </div>
  )
}

export default Profile