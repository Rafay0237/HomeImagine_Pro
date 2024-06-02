import UpdateProfile from "../Components/UpdateProfile";
import {  useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {updateBusisnessProfile} from "../redux/user/userSlice"
import toast from 'react-hot-toast';
import { submitData } from "../APICALLS";

export default function BuildProfile() {
 const {currentUser,businessProfile} =useSelector(state=>state.user)
 const navigate = useNavigate();
 const dispatch=useDispatch();


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
    submitData("pro/"+endPoint,method,data).then((resData) => {
      dispatch(updateBusisnessProfile(resData))
      toast.success(businessProfile?'Updated Profile':'Profile Created!');
      navigate("/")
    });
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
