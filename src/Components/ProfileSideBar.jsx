import React from 'react'
import {Link} from "react-router-dom"
import { FaPen } from "react-icons/fa";

const ProfileSideBar = () => {
  return (
    <div className='flex flex-col  px-5 gap-3 mt-2  text-base'>

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
      <div className='flex hover:text-green hover:cursor-pointer items-center gap-3 '>
    <FaPen className='h-3 w-3 '/>
    <p >Edit Buisness Profile</p>
      </div>
    </Link>
    <Link to="/project/post">
    <div className='flex hover:text-green hover:cursor-pointer items-center gap-2 '>
    <p className='text-2xl -mt-1'>+</p>
    <p >Add Project</p>
      </div>
    </Link>
    <Link to="/profile/slider-img-post">
    <div className='flex hover:text-green items-center gap-2 hover:cursor-pointer '>
    <FaPen className='h-3 w-3 '/>
    <p >Add Background Images</p>
      </div>
    </Link>
    <Link to="/earnings">
    <p className=' hover:text-green hover:cursor-pointer'>Earnings</p>
    </Link>
    <Link to="/contract">
    <p className=' hover:text-green hover:cursor-pointer'>Contracts</p>
    </Link>

    </div>
  )
}

export default ProfileSideBar
