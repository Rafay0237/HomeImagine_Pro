import { IoChatboxEllipses } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { SiHomeadvisor } from "react-icons/si";
import { FaFileContract } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";

import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.user);

  return (
    <div>
      <div className="navbar justify-between">

        <div>
        <Link to="/">
        <SiHomeadvisor className="h-12 w-12 text-[#4DBC15]" />
        </Link>
        </div>
        
        <div className="flex gap-10 sm:gap-16 items-center">

        <Link to="/contract" >
            <div>
          <FaFileContract className="text-2xl mx-auto" />
          <p className="text-sm">Contracts</p>
            </div>
        </Link>

        <Link to="/notifications" className="">
            <div className="flex relative ">
          <FaBell className="text-2xl mx-auto" />
          <p className="text-sm pr-2">Alerts</p>
          {notifications.length!==0&& <p className="absolute w-5 h-5  text-center bg-green text-white rounded-full text-[10px] -top-3 -right-2 pt-[1px] ">
            {notifications.length}1</p>}
            </div>
            
        </Link>

        <Link to="/chats" className="">
            <div>
          <IoChatboxEllipses className="text-[24px] mx-auto" />
          <p className="text-sm">Messages</p>
            </div>
        </Link>

        {currentUser ? (
            <Dropdown img={currentUser.user.profilePicture}/>
            ) : (
                <Link to="/login" className="btn-dark py-2">
            Login
          </Link>
        )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
