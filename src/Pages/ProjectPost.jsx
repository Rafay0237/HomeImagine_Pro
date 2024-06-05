import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RiImageAddFill } from "react-icons/ri";

const ProjectPost = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    desc: ""
  });
  const fileRef = useRef();

  const handleSendProjectData = async () => {
    if (!formData.name || !formData.location || !formData.desc) {
      toast.error("All Fields Are Required!");
      return;
    }
    if (image === undefined) {
      toast.error("Image is Required!");
      return;
    }
    if (image.size > 8097152) {
      toast.error("Image Size limit is 8MB!");
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("image", image);
    formDataToSend.append("proId", currentUser.user._id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("desc", formData.desc);
    const res = await fetch(
      import.meta.env.VITE_APP_API_URL + "upload-img/project",
      {
        method: "POST",
        body: formDataToSend,
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success("Project Posted Successfully!");
      navigate("/profile")
    } else {
      toast.error(data.error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (loading)
    return (
      <div className="flex h-[80vh] justify-center items-center text-3xl text-dark-grey font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="flex justify-center min-h-[80vh] my-5">
      <div className="flex flex-col gap-5  w-full md:w-[40%]  p-10 border-grey border-2 ">
        <div>
          <label className="text-base text-[#33334D] ">Project Name</label>
          <input
            id="name"
            type="text"
            placeholder="Project Name here."
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2 "
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-base text-[#33334D] ">
            Domain or location of the project
          </label>
          <input
            id="location"
            type="text"
            placeholder="Project Domain."
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2 "
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-base text-[#33334D] ">Description</label>
          <textarea
            placeholder="Describe Your Project details here, that can be valuable to the Clients."
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2 placeholder:text-dark-grey placeholder:font-lightbold "
            rows="5"
            id="desc"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="Image upload here">
          <label className="text-base text-[#33334D] ">
            Add a Project Photo here
          </label>
          <input
            type="file"
            ref={fileRef}
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <div className="relative ">
            <RiImageAddFill
              className="h-20 w-20  md:h-32 md:w-32  cursor-pointer "
              onClick={() => fileRef.current.click()}
            />
          </div>
        </div>
        <button
          className=" bg-green text-white  hover:bg-dark-green
             rounded-md font-lightbold p-4"
          onClick={handleSendProjectData}
        >
          Post Project
        </button>
      </div>
    </div>
  );
};

export default ProjectPost;
