import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { getData ,deleteData} from "../APICALLS"
import { useSelector } from "react-redux"
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast"

const EditProject = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [projects,setProjects]=useState(null)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
    getData("pro/project/"+currentUser.user._id).then((data)=>{
        if(data.found){
        setProjects(data.projects)
        }
    })
    setLoading(false)
    },[])

    const handleDeleteProject=async(projectId)=>{
        deleteData("pro/project/"+projectId,currentUser.token).then((data)=>{
            if(data.deleted){
            setProjects(projects.filter((project)=>(project._id!==projectId)))
            toast.success(data.message)
            }else{
            toast.error(data.message)
            }
        })
    }

    if (loading)
        return (
            <div className="flex h-60 justify-center items-center text-2xl font-lightbold">
            Loading...
            </div>
        );

  return (
    <div className='flex justify-center min-h-[100vh]'>
      <div className='bg-white w-[90%] sm:w-[80%]'>
        <div className='flex justify-between py-5 pt-7 items-center '>
         <p className='text-2xl sm:text-3xl font-gelasio'>Current Projects</p>
         <Link to="/project/post">
         <button className='p-2 px-5  bg-purple text-white text-[10px] sm:text-base rounded-md font-lightbold hover:opacity-95'>
            + Add New
         </button>
         </Link>
        </div>
     
    {projects && projects.length!==0 ?
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7 lg:gap-10" >
    {projects.map((project)=>(
      <ProjectCard project={project} key={project._id} handleDeleteProject={handleDeleteProject}/>
    ))}
      </div>
    :<div className="text-xl sm:text-2xl md:text-3xl text-[#cbcaca] font-lightbold w-4/5 md:w-3/4 lg:w-2/3 text-jsutify mx-auto mt-[10%]">
      Currently You have no Projects, Add new Projects to Show your work.
      </div>}

      </div>
    </div>
  )
}

const ProjectCard=({project,handleDeleteProject})=>{



return (
    <div className="relative h-[240px] xs:h-[220px] md:h-[360px]  rounded-lg shadow-lg">
        <img className="h-40  md:h-80 rounded-md object-cover"
        src={project.img}
        alt='Project Wallpaper'
         />
         <div className="flex flex-col justify-center px-4">
         <p className="font-lightbold pt-2">{project.name} </p>
         <div className="flex p-2 gap-2">
          <FaLocationDot className="h-5 w-5 "/>
         <p className="text-dark-grey ">{project.location}</p>
         </div>
         </div>
      <MdDelete className="absolute top-0 -right-0 h-5 w-5 md:h-7 md:w-7 xl:h-8 xl:w-8 hover:text-red-700 hover:cursor-pointer bg-white rounded-full"
      onClick={()=>handleDeleteProject(project._id)}/>
      </div>
)
}

export default EditProject
