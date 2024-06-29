import { getData } from "../APICALLS";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import { updateNotifications } from "../redux/user/userSlice";
import {Link} from "react-router-dom"


const NotificationsPage = () => {
  const {currentUser}=useSelector(state=>state.user)
  const {notifications}=useSelector(state=>state.user)
  const dispatch=useDispatch()

  useEffect(() => {
   getData("proposal/get/"+currentUser.user._id).then(data=>{
    dispatch(updateNotifications(data.proposals.length))
   })
  }, []);

  return (
    <div className="flex  justify-center min-h-[60vh] w-full ">
      {notifications?
      <div className="flex gap-5  sm:gap-10 md:gap-20 w-[95%] sm:w-[80%] mt-16">
      <p className="text-xl sm:text-2xl text-[#cbcaca] font-lightbold   text-justify ">
       {notifications>1 ? "You have got new Proposals!"
       :"You have Got a new Proposal!"}</p>
       <Link to="/proposals">
       <button className="p-3 h-12 w-48  bg-green hover:bg-dark-green text-white rounded-md font-lightbold">
        View Proposals</button>
       </Link>
       </div>
      :
       <p className="mt-36 text-3xl text-[#cbcaca] font-lightbold w-4/5 md:w-3/4 lg:w-2/3 text-justify" >
        Notifications from website will appear here, updates will be shown here.</p>
        }
        </div>
  )
}

export default NotificationsPage
