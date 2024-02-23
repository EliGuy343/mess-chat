"use client"

import Loader from '@components/Loader'
import { Person2Outlined } from '@mui/icons-material'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { CldUploadButton } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
  const {data: session} = useSession();
  const user = session?.user;
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: {error}
  } = useForm();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(user) {
      reset({
        username: user?.username,
        profileImage: user?.profileImage
      })
    }
    setLoading(false);
  }, [user]);


  const updateUser = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/users/${user._id}/update`,
        data
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const uploadPhoto = (result) => {
    setValue("profileImage", result?.info?.secure_url);
  }

  return loading ? <Loader/> : (
    <div className='profile-page'>
      <h1 className='text-heading3-bold'>Edit Your Profile</h1>
      <form className='edit-profile' onSubmit={handleSubmit(updateUser)}>
        <div className='input'>
          <input
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if(value.length <= 3) {
                  return "username must be longer than 3 characters"
                }
              }
            })}
            type='text'
            placeholder='Username'
            className='input-field'
          />
          <Person2Outlined/>
        </div>
        {error?.username && (
          <p className='text-red-500'>{error?.username?.message}</p>
        )}
        <div className='flex items-center justify-between'> 
          <img
            src={watch("profileImage") || user?.profileImage || "/assets/person.jpg"}
            alt='profile picture'
            className='w-40 h-40 rounded-full'
            />
          <CldUploadButton
            options={{maxFiles: 1}}
            onUpload={uploadPhoto}
            uploadPreset='npczwv3c'
          >
            <p
              className='text-body-bold'
            >
              Upload New Photo
            </p>
          </CldUploadButton>
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