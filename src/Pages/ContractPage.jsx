import { useEffect, useState } from "react";
import { getData } from "../APICALLS";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ContractPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [contracts, setContracts] = useState(null);
  const [sentContracts, setSentContracts] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showSentContracts, setShowSentContracts] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData("contract/ongoing-pro/" + currentUser.user._id).then((data) => {
      if (data.success) {
        setContracts(data.contracts);
      }
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getData("contract/sent-pro/" + currentUser.user._id).then((data) => {
      if (data.success) {
        setSentContracts(data.contracts);
      }
    });
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex h-60 justify-center items-center text-2xl font-lightbold">
        Loading...
      </div>
    );

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-[90%] sm:w-[80%]">

        <div className="flex justify-between items-center pb-10">
          <p className="text-3xl font-lightbold py-10">
            {showSentContracts ? "Sent Contracts" : "Active Contracts"}
          </p>
          {showSentContracts && (
            <p
              className="text-2xl font-lightbold py-10 hover:cursor-pointer hover:text-dark-grey pr-[3%]"
              onClick={() => setShowSentContracts(false)}
            >
              Back
            </p>
          )}
        </div>

        <div className="flex flex-col gap-16">
          {contracts ? (
            contracts.map((contract) => <ContractCard contract={contract} key={contract._id} />)
          ) : !showSentContracts ? (
            <div className="flex flex-col bg-grey gap-8 p-[10%] rounded-lg items-center">
              <p className="text-3xl font-lightbold">
                There are no active Contracts
              </p>
              <p className="text-xl font-lightbold">
                Contracts you are working on will appear here.
              </p>
              <button
                className="bg-green hover:bg-dark-green w-60 font-lightbold p-2 rounded-3xl px-5 text-white "
                onClick={() => setShowSentContracts(true)}
              >
                Show Sent Contracts
              </button>
            </div>
          ) : (
            sentContracts ?
            sentContracts.map((contract) => (
              <ContractCard contract={contract} key={contract._id} />
            )) :
            <div className="flex flex-col bg-grey gap-8 p-[10%] rounded-lg items-center">
              <p className="text-3xl font-lightbold">
                There are no Sent Contracts
              </p>
              <p className="text-xl font-lightbold">
                Contracts you have sent will appear here.
              </p>
              <button
                className="bg-green hover:bg-dark-green w-60 font-lightbold p-2 rounded-3xl px-5 text-white "
                onClick={() => setShowSentContracts(false)}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ContractCard = ({ contract }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex justify-between flex-wrap sm:flex-nowrap items-center">

      <div className="flex flex-col items-center ">
        <p className="text-dark-grey font-lightbold">Price</p>
        <p className=" font-lightbold">${contract.payment.total}</p>
      </div>

      <div className="flex flex-col items-center ">
        <p className="text-dark-grey font-lightbold">Due In</p>
        <p className=" font-lightbold">{formatDate(contract.deadline)}</p>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-dark-grey font-lightbold">Status</p>
        <p className="rounded-[15px] px-3 p-[1px] bg-purple text-white font-lightbold">
          {contract.accepted? "in progress" :"not accepted yet"}
        </p>
      </div>
      <Link to={contract._id}>
      <button className="h-10 w-28 bg-green hover:bg-dark-green rounded-md text-white">
        View
      </button>
      </Link>
    </div>
  );
};

export default ContractPage;
