import {useState} from 'react'
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { deleteData } from '../APICALLS';
import { useSelector } from 'react-redux';
import {toast} from "react-hot-toast"

const Slider = ({images,setSliderImages}) => {
    const [currentImage,setCurrentImage]=useState(0)
    const [loading,setLoading]=useState(false)
    const { currentUser } = useSelector((state) => state.user);

    const handleDeleteImg=async()=>{
      if(images.length<2){
        toast.error("Can not delete last image!")
        return
      }
      setLoading(true)
      deleteData("pro/profile/"+currentUser.user._id+"/index/"+currentImage,currentUser.token).then((data)=>{
        if(data.deleted){
          setSliderImages(images.splice(currentImage, 1))
          window.location.reload();
          toast.success(data.message)
          }else{
          toast.error(data.message)
        }
      })
      setLoading(false)
    }

  if (loading)
    return (
      <div className="flex min-h-[70vh] justify-center items-center text-2xl font-lightbold">
        Loading...
      </div>
    );

  return (
    <div className='flex items-center relative '>

        <button className='rounded-full bg-white shadow-md  p-2 absolute left-0 sm:left-5 top-[45%] '
      onClick={()=>currentImage===0?setCurrentImage(images.length-1):setCurrentImage(currentImage-1)}
      ><GrFormPrevious className='text-3xl text-dark-grey '/></button>

      {images?.map(img=>(
          <img 
          className={'object-contain w-[90%] h-[55vh] mx-auto rounded-md shadow-lg'
          +(images[currentImage]!=img&&" hidden")}
          src={img} alt='Project Wallparers'
          key={img} />
          ))}

      <button className='rounded-full bg-white  p-2 shadow-lg absolute right-0 sm:right-5  top-[45%] '
      onClick={()=>currentImage===images.length-1?setCurrentImage(0):setCurrentImage(currentImage+1)}
      ><GrFormNext className='text-3xl text-dark-grey'/></button>

      <MdDelete className='absolute h-10 w-10 top-[26%] lg:top-0 -right-2 md:right-0 hover:text-red-700 hover:opacity-90 hover:cursor-pointer'
      onClick={handleDeleteImg}/>

      </div>
  )
}

export default Slider
