import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/Pages/Login"
import SignUp from "../src/Pages/SignUp"
import HomePage from "./Pages/HomePage";
import BuildProfile from "./Pages/BuildProfile";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage";
import ChangePassword from"./Pages/ChangePassword"
import ChangeUsername from "./Pages/ChangeUsername";
import ChatPage from "./Pages/ChatPage";
import ProposalsPage from "./Pages/ProposalsPage";
import CreateContract from "./Pages/CreateContract";
import ViewContractPage from "./Pages/ViewContractPage"
import ContractPage from "./Pages/ContractPage";
import EarningsPage from "./Pages/EarningsPage";
import ProjectPost from "./Pages/ProjectPost";
import SliderImagePage from "./Pages/SliderImagesPage";

import PrivateRoute from "./Components/PrivateRoute";
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
    {currentUser&&<Navbar/>}
    <Toaster/>
    <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />

        <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-username" element={<ChangeUsername />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/build-profile" element={<BuildProfile/>} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
        <Route path="/contract" element={<ContractPage />} />
        <Route path="/contract/create/:id" element={<CreateContract />} />
        <Route path="/contract/:id" element={<ViewContractPage />} />
        <Route path="/earnings" element={<EarningsPage />} />
        <Route path="/project/post" element={<ProjectPost />} />
        <Route path="/profile/slider-img-post" element={<SliderImagePage />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
