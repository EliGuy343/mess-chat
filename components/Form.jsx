"use client"  
import { EmailOutlined, LockOutlined, Person, PersonOutline } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const Form = ({type}) => {
  const {
    register, 
    handleSumbit,
    watch,
    formState: {errors},
  } = useForm();

  return (
    <div className='auth'>
      <div className='content'>
        <img src='/assets/logo.png' alt='logo' className='logo'/>
        <form className='form'>
          {type == "register" && (
            <>
              <div className='input'>
                <input
                  type='text'
                  placeholder='Username'
                  className='input-field'
                  {...register("username", {required:"username is required"})}
                />
                <PersonOutline sx={{color: "#737373"}}/>
              </div>
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </>
          )}
          <>
            <div className='input'>
              <input
                type='text'
                placeholder='Email'
                className='input-field'
                {...register("email",{required:"Email is required"})}
              />
              <EmailOutlined sx={{color: "#737373"}}/>
            </div>
            {errors.username && (
                <p className='text-red-500'>{errors.username.message}</p>
            )}
          </>
          <div  className='input'>
            <input
              type='password'
              placeholder='Password' 
              className='input-field'
              {...register("password", {
                  required:"Password is required",
                  validate:(value) => {
                    if(value.length < 6) {
                      return "Password needs to be at least 6 characters long"
                    }
                  }
              })}
            />
            <LockOutlined sx={{color: "#737373"}}/>
          </div>
          <button className='button'  type='sumbit'>
            {type === "register" ? "Join Free" : "Let's Chat"}
          </button>
        </form>
        {type === "register" ? (
          <Link href={'/'} className='link'>
            <p className='text-center'>Already have an Account? Login</p>
          </Link>
        ) : (
          <Link href={'/register'} className='link'>
            <p className='text-center'>Don't have account? Register</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Form