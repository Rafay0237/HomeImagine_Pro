import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../APICALLS";

const ViewContractPage = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    getData("contract/" + id).then((data) => {
      console.log(data)
      if (data.success) {
        setContract(data.contract);
      }
    });
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading)
    return (
      <div className="flex h-60 justify-center items-center text-2xl font-lightbold">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-grey min-h-[70vh]">
      <div className="w-[80%] md:w-[50%] text-3xl font-lightbold pt-10 pb-3">
        Contract Terms
      </div>
      <div className="w-[80%] md:w-[50%] bg-white p-5 border border-[#CCCCCC] mb-10">
        <div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">Starting Date</label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {formatDate(contract?.intro.date)}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">
              Introduction Description
            </label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.intro.description}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">Deliverables</label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.deliverables}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">Payment Total</label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.payment.total}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">Payment Schedule</label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.payment.paymentSchedule}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">Deadline</label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {formatDate(contract?.deadline)}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">
              Termination Conditions
            </label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.termination.conditions}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-base text-[#33334D]">
              Payment on Termination
            </label>
            <p className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2">
              {contract?.termination.paymentOnTermination}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContractPage;
