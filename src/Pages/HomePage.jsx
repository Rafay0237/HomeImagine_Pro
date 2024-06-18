import { useState } from "react";
import {Link} from "react-router-dom"
import { IoIosPerson } from "react-icons/io";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";

const HomePage = () => {
  const [showIndex,setShowIndex]=useState(0)
  return (
    <div className='flex justify-center bg-grey min-h-[90vh]'>
      <div className='w-[90%] bg-white '>
      <div className='flex flex-col gap-5 p-7 border-[#E9E6DE] border-b '>
      <p className='text-xl font-lightbold '>Home Imagine Pro is an all-in-one solution for your business.</p>
      <p className='text-base '>Explore what you can do by clicking on the tabs below.</p>
      </div>

      <div className='flex flex-wrap justify-evenly gap-10 p-6 pt-10 '>

      <div className={"relative "+(showIndex===0 ?"text-black": "text-dark-grey")}>
      <button className={'font-lightbold p-5 pl-14 pr-10  bg-[#F8F6F2] rounded-md '+(showIndex===0 ?"border-[#222222] border-2": "border-grey border-2")}
      onClick={()=>setShowIndex(0)}>
      BUILD YOUR BRAND
      </button>
      <IoIosPerson className="absolute left-5 top-[33%] h-6 w-6"/>
      </div>

      <div className={"relative "+(showIndex===1 ?"text-black": "text-dark-grey")}>
      <button className={'font-lightbold p-5 pl-14 pr-10 bg-[#F8F6F2] rounded-md '+(showIndex===1 ?"border-[#222222] border-2": "border-grey border-2")}
      onClick={()=>setShowIndex(1)}>
      Upload Project Photos
      </button>
      <FaCloudUploadAlt className="absolute left-5 top-[33%] h-6 w-6"/>
      </div>

      <div className={"relative "+(showIndex===2 ?"text-black": "text-dark-grey")}>
      <button className={'font-lightbold p-5 pl-14 pr-10  bg-[#F8F6F2] rounded-md '+(showIndex===2 ?"border-[#222222] border-2": "border-grey border-2")}
      onClick={()=>setShowIndex(2)}>
      Request Reviews
      </button>
      <CiSquareQuestion className="absolute left-5 top-[33%] h-6 w-6"/>
      </div>

      <div className={"relative "+(showIndex===3 ?"text-black": "text-dark-grey")}>
      <button className={'font-lightbold p-5 pl-20 pr-14  bg-[#F8F6F2] rounded-md '+(showIndex===3 ?"border-[#222222] border-2": "border-grey border-2")}
      onClick={()=>setShowIndex(3)}>
      Get Paid
      </button>
      <RiMoneyDollarBoxFill className="absolute left-10 top-[33%] h-6 w-6"/>
      </div>

      </div>

      <DynamicDiv data={data[showIndex]}/>
     
      </div>
    </div>
  )
}

const DynamicDiv=({data})=>{
  return(
    <div className="flex flex-col gap-7 mt-5 p-7 sm::w-[80%] md:w-[70%] lg:w-[50%] mx-auto">
      <p className="text-2xl font-lightbold">{data.header}</p>
      <p className="text-xl ">{data.text}</p>
      <Link to={data.link}>
      <button className="w-full xs:w-[70%] sm:w-[50%] p-3 px-6 bg-black text-xl text-white font-lightbold rounded-[4px] hover:opacity-95">
      {data.btnText}
      </button>
      </Link>
      </div>
  )
}

let data=[
  {
    header:"Your profile should not miss key information required to attract customers",
    text:"Complete your profile so homeowners can find and learn about your business.",
    btnText:"Complete My Public Profile",
    link:"/profile"
 },
  {
    header:"Upload project photos to be found by potential clients",
    text:"A project is a collection of photos of your work. Photos help your business get found on Houzz by hiring homeowners.",
    btnText:"Upload Project Photos",
    link:"/project/post"
 },
  {
    header:"Request reviews from past clients and colleagues",
    text:"Pros who have at least 3 reviews are 15X more likely to be contacted.",
    btnText:"Request Reviews",
    link:"/chats"
 },
  {
    header:"Get paid fast, online and on time",
    text:"Make Contracts and ask clients to pay instantly after the project completion by credit card so you never wait for another check to clear.",
    btnText:"Ask Clients",
    link:"/chats"
 }
]


export default HomePage
