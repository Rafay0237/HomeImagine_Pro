import {useEffect,useState,useRef} from 'react'
import {getData} from "../APICALLS"
import {useSelector} from "react-redux"
import Slider from '../Components/Slider'
import PhotoUpload from '../Components/PhotoUpload'
import toast from 'react-hot-toast';

const SliderImagePage = () => {
  const [sliderImages,setSliderImages]=useState(null)
  const [imagePreview, setImagePreview] = useState(undefined);
  const [loading,setLoading]=useState(false)
  const [image,setImage]=useState(undefined);
  const {currentUser}=useSelector(state=>state.user)

  useEffect(()=>{
    setLoading(true)
  getData("pro/sliderImages/"+currentUser.user._id).then((data)=>{
    if(data.success){
      setSliderImages(data.sliderImages)
    }
    setLoading(false)
  })
  },[])

  const handleImageUpload=async()=>{
    if(sliderImages.length>3){
      toast.error("Can not Add more than 4 images!")
      return
    }else if(image.size>7097152 ){
      setImageError({success:false,message:"Image Size limit is 7MB!"})
      return;
    }
    setLoading(true)
    const formData=new FormData();
    formData.append('image',image)
    formData.append('proId',currentUser.user._id)
    const res =await fetch(import.meta.env.VITE_APP_API_URL+'upload-img/slider',{
      method:"POST",
     body:formData
    })
    const data=await res.json()
    if(data.success){
    setSliderImages([...sliderImages,data.img])
    toast.success("New SLider Image Added!")
    }else{
      toast.error(data.message)
      }
    setLoading(false)
  }


  if (loading)
    return (
      <div className="flex min-h-[70vh] justify-center items-center text-2xl font-lightbold">
        Loading...
      </div>
    );
  
  return (
    <div>
      <div className="w-full md:w-[70%]  ">
        <p className='text-3xl font-lightbold pl-10 pt-3'>Current Slider Images: </p>
        {sliderImages ?
          <Slider images={sliderImages} setSliderImages={setSliderImages}/>
          : <p className='text-2xl font-lightbold text-dark-grey pl-10  py-14 text-center'>No Slider Images Yet! </p>
        }
        
        <div className='flex flex-col  sm:items-center px-10 gap-5 pt-5 '>
        <p className='text-xl '
        >For an optimal user experience and visual appeal, it is mandatory to include
         <span className='text-red-700 text-xl'> at least one </span>
         image in your profile slider. This ensures that your profile remains engaging and informative. Additionally, to maintain a streamlined and effective presentation, the
         <span className='text-red-700 text-xl'> maximum number of images are limited to five.</span> 
           This cap helps to keep the slider concise and prevents it from becoming overwhelming, ensuring that each image receives proper attention and enhances your overall profile aesthetic.</p>
        
        <div className='flex flex-col  w-full '> 
        <p className='text-xl font-lightbold p-1 '>Add New Image </p>

        <PhotoUpload setImage={setImage} setImagePreview={setImagePreview}/>
        {imagePreview && 
          <img className="h-[100px] w-[100px] object-contain rounded-lg mt-3"
          src={imagePreview}
          alt="Your Project Here"
          />
          }
        <button
        hidden={image===undefined}
        disabled={loading}
          className="bg-green text-white 
        p-3 rounded-lg hover:opacity-95 mt-2 "
        onClick={handleImageUpload}
        >
          {loading ? "Loading..." : "Upload"}
        </button>
        </div>

        </div>

      </div>
    </div>
  )
}

export default SliderImagePage
