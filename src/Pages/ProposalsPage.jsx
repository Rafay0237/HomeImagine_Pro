import ProposalsCard from "../Components/ProposalsCard";
import { getData } from "../APICALLS";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"

const ProposalsPage = () => {
  const [proposals, setProposals] = useState(null);
  const {currentUser}=useSelector(state=>state.user)

  useEffect(() => {
   getData("proposal/get/"+currentUser.user._id).then(data=>{
     setProposals(data.proposals);
   })
  }, []);
  const removeProposal=(id)=>{
  setProposals(proposals.filter(proposal=>proposal._id!==id))
  }
  return (
    <div className=" bg-grey ">
      <div className="bg-white w-[90%] min-h-[90vh] mx-auto p-6 pt-10 ">
        <p className="text-2xl font-lightbold text-dark-grey pb-8">
          Proposals Here
        </p>

        <div className="flex flex-col gap-5 ">
          {proposals?.map((proposal) => (
            <ProposalsCard
            key={proposal._id} 
            proposal={proposal} 
            removeProposal={removeProposal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalsPage;
