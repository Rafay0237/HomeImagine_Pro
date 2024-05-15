import UpdateProfile from "../Components/UpdateProfile";
import {  useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {updateBusisnessProfile} from "../redux/user/userSlice"
import toast from 'react-hot-toast';

export default function BuildProfile() {
 const {currentUser,businessProfile} =useSelector(state=>state.user)
 const navigate = useNavigate();
 const dispatch=useDispatch();

  async function postData(url = "", data = {},method="") {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData=await res.json()
    return resData
  }


  const submitProfileData = (data) => {
    let endPoint=businessProfile?"update-profile":"build-profile"
    let method=businessProfile?"PUT":"POST"
    if(businessProfile===null ||undefined)
    {
      let userId=currentUser.user._id;
      let logo=currentUser.user.profilePicture
      let temp= {...data,userId,logo}
      data=temp
    }

    try{
    postData(import.meta.env.VITE_APP_API_URL+"pro/"+endPoint, data,
    method).then((resData) => {
      dispatch(updateBusisnessProfile(resData))
      toast.success(businessProfile?'Updated Profile':'Profile Created!');
      navigate("/")
    });
  }catch(error){
    console.log(error)
  }
  };

  return (
    <div className="  flex  justify-center ">

    <div className=" w-[60%] " >
      <p className="text-[32px] font-[400] text-[#333333] mt-14 mb-4">
        Public Business Information</p>

     <UpdateProfile  submitProfileData={submitProfileData} 
     profile={businessProfile}
     btnName={businessProfile?"Update Profile":"Build Profile"}
     />
    </div>
    
    </div>
  );
}
