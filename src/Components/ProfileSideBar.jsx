import React from 'react'
import {Link} from "react-router-dom"
import { FaPen } from "react-icons/fa";

const ProfileSideBar = () => {
  return (
    <div className='flex-col w-[25%] px-5 gap-3 mt-2 md:flex hidden text-base'>

    <p className='font-lightbold mb-3'>Personal Account</p>

    <p className=' hover:text-green hover:cursor-pointer text-dark-grey'>Profile info</p>
    <Link to="/change-username">
    <p className=' hover:text-green hover:cursor-pointer'>Change Username</p>
    </Link>
    <Link to="/change-password">
    <p className=' hover:text-green hover:cursor-pointer'>Change Password</p>
    </Link>

    <hr className='text-dark-grey my-2'/>

    <p className='font-lightbold mb-3'>Buisness Account</p>

    <Link to="/build-profile">
      <div className='flex hover:text-green hover:cursor-pointer '>
    <FaPen className='h-3 w-3 m-1.5 mx-2'/>
    <p >Edit Buisness Profile</p>
      </div>
    </Link>
    <Link to="/">
    <p className=' hover:text-green hover:cursor-pointer'>Earnings</p>
    </Link>
    <Link to="/">
    <p className=' hover:text-green hover:cursor-pointer'>Contracts</p>
    </Link>

    </div>
  )
}

export default ProfileSideBar
