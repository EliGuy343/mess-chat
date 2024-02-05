import { EmailOutlined, LockOutlined, Person, PersonOutline } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'

const Form = ({type}) => {
  return (
    <div className='auth'>
      <div className='content'>
        <img src='/assets/logo.png' alt='logo' className='logo'/>
        <form className='form'>
          {type == "register" && (
            <div className='input'>
              <input  type='text' placeholder='Username'  className='input-field'/>
              <PersonOutline sx={{color: "#737373"}}/>
            </div>
          )}
          <div className='input'>
            <input type='text' placeholder='Username' className='input-field'/>
            <EmailOutlined sx={{color: "#737373"}}/>
          </div>
          <div  className='input'>
            <input  type='password' placeholder='Password'  className='input-field'/>
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