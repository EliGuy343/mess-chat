"use client"  
import { EmailOutlined, LockOutlined, Person, PersonOutline } from '@mui/icons-material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {signIn} from "next-auth/react";

const Form = ({type}) => {

  const {
    register, 
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register",{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
      });

      if(res.ok) {
        router.push("/");
      }
      if (res.error) {
        toast.error(res.error);
      }
    }

    if(type === "login") {
        const res = await signIn("credentials", {
          ...data,
          redirect: false
        });

        if (res.ok) {
          router.push("/chats");
        }
        if (res.error) {
          toast.error("Invalid Email or Password");
        }
    }
  };

  return (
    <div className='auth'>
      <div className='content'>
        <img src='/assets/logo.png' alt='logo' className='logo'/>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          {type == "register" && (
            <div>
              <div className='input'>
                <input
                  defaultValue=""
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
            </div>
          )}
          <div>
            <div className='input'>
              <input
                defaultValue=""
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
          </div>
          <div>

            <div  className='input'>
              <input
                defaultValue=""
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
            {errors.username && (
                  <p className='text-red-500'>{errors.username.message}</p>
              )}
          </div>
          <button className='button'  type='submit'>
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