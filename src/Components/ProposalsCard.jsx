import { submitData ,deleteData} from "../APICALLS";
import toast from "react-hot-toast";

const ProposalsCard = ({ proposal,removeProposal }) => {
 const handleAccept=async()=>{
 submitData("proposal/accept","POST",{senderId:proposal.senderId,userId:proposal.userId}).then((data)=>{
  if(data.accepted){ 
   toast.success(data.message)
   removeProposal(proposal._id)
   return 
  }
   toast.error(data.message)
 })
 }
 
 const handleCancel=async()=>{
  deleteData("proposal/delete",{senderId:proposal.senderId,userId:proposal.userId}).then((data)=>{
   if(data.deleted){ 
   toast.success(data.message)
   removeProposal(proposal._id)
   return 
  }
   toast.error(data.message)
    })
 }


  return (
    <div className="p-8 bg-grey w-full sm:w-[90%] rounded-sm">
      <p className="text-base text-green font-semibold ">{proposal.userName}</p>

      <div className="flex flex-col xs:flex-row gap-4 py-2 ">
        <p className="text-base font-lightbold ">Email: </p>
        <p className="text-base whitespace-nowrap ">{proposal.email}</p>
      </div>

      <div className="flex gap-4">
        <p className="text-base font-lightbold">message: </p>
        <p className="text-base">{proposal.message}</p>
      </div>

      <div className="flex gap-4 pt-6">
        <button className="p-2 w-24 h-10 bg-[#15803d] text-white rounded-md text-base"
        onClick={handleAccept}
        >  
          Accept
        </button>
        <button className="p-2 w-24 h-10 bg-[#dc2626] text-white rounded-md text-base"
        onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProposalsCard;
