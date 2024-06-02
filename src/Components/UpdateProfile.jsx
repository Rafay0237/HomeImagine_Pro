import { useForm } from "react-hook-form";

const Updateprofile = ({ submitProfileData ,profile,btnName}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues:profile});

  return (
    <div>
      <form onSubmit={handleSubmit(submitProfileData)}>
        <div>
          <label className="text-base text-[#33334D] ">
            Professional/Firm Name
          </label>
          <input
            type="text"
            placeholder={profile?.firmName}
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2 "
            {...register("firmName", {
              required: {
                value: true,
                message: "Firm name is Required! ",
              },
            })}
          />
          {errors.firmName && (
            <span className="text-red text-base">
              {errors.firmName.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-base text-[#33334D] ">Name</label>
          <input
          placeholder={profile?.fullName}
            type="name"
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            {...register("fullName", {
              required: {
                value: true,
                message: "Your Name is Required! ",
              },
              minLength: {
                value: 4,
                message: "Too Short Name",
              },
            })}
          />
          {errors.fullName && (
            <span className="text-red text-base">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-base text-[#33334D] ">
            Business Description
          </label>
          <textarea
            placeholder={profile?.desc}
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            rows="3"
            {...register("desc", {
              required: {
                value: true,
                message: "Business Description is Required! ",
              },
              minLength: {
                value: 20,
                message: "Too Short Business Description",
              },
            })}
          ></textarea>
          {errors.desc && (
            <span className="text-red text-base">{errors.desc.message}</span>
          )}
        </div>

        <div>
          <label className="text-base text-[#33334D] ">Title For description Paragrapgh (optional)</label>
          <input
          placeholder={profile?.descTitle}
            type="name"
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            {...register("descTitle")}
          />
        </div>
        <div>
          <label className="text-base text-[#33334D] ">Address (optional)</label>
          <input
          placeholder={profile?.address}
            type="name"
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            {...register("address")}
          />
        </div>
        <div>
          <label className="text-base text-[#33334D] ">Phone number (optional)</label>
          <input
          placeholder={profile?.phoneNumber}
            type="tel"
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            {...register("phoneNumber")}
          />
        </div>
        <div>
          <label className="text-base text-[#33334D] ">Website (optional)</label>
          <input
          placeholder={profile?.website}
            type="text"
            className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
            {...register("website")}
          />
        </div>
        <div>
          <p className="text-base text-[#33334D] mt-2 ">Social Links (optional)</p>
          <p className="text-base text-[#33334D] mt-2">Instagram</p>
          <input
          placeholder={profile?.insta }
          type="text"
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          {...register("insta")} />
          <label className="text-base text-[#33334D] ">Facebook</label>
          <input
          placeholder={profile?.facebook}
          type="text"
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          {...register("facebook")}
          />

        </div>

        <label className="text-base text-[#33334D] ">
          Certification and Awards (optional)
        </label>
        <textarea
        placeholder={profile?.awards}
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          rows="2"
          {...register("awards", { max: [100, "Too Long Description"] })}
        ></textarea>

        <p className="text-[32px] font-[400] text-[#333333] my-2 mb-4">
          Services
        </p>

        <label className="text-base text-[#33334D] ">
          Services Provided (optional)
        </label>
        <textarea
        placeholder={profile?.services}
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          rows="2"
          {...register("services", { max: [100, "Too Long Description"] })}
        ></textarea>

        <label className="text-base text-[#33334D] ">
          Areas Serviced (optional)
        </label>
        <textarea
        placeholder={profile?.areasServiced}
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          rows="2"
          {...register("areasServiced", { max: [100, "Too Long Description"] })}
        ></textarea>
        
        <p className="text-[32px] font-[400] text-[#333333]  my-2 mb-4">
          Typical Job Cost
        </p>

        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <p className="text-dark-grey p-0 md:p-3">Cost Range:</p>
          <div>
            <input
            placeholder={profile?.from}
              type="number"
              className="border-[#CCCCCC] border rounded-sm p-1.5 px-3  my-2"
              {...register("from", {
                required: {
                  value: true,
                  message: " Required! ",
                },
              })}
            />
            {errors.from && (
              <span className="text-red text-base">{errors.from.message}</span>
            )}
          </div>

          <div>
            <input
              type="number"
              className="border-[#CCCCCC] border rounded-sm p-1.5 px-3  my-2"
              placeholder={profile?.to}
              {...register("to", {
                required: {
                  value: true,
                  message: " Required! ",
                },
              })}
            />
            {errors.to && (
              <span className="text-red text-base">{errors.to.message}</span>
            )}
          </div>
        </div>

        <label className="text-base text-[#33334D] ">
          Cost Description (optional)
        </label>
        <textarea
        placeholder={profile?.costDesc}
          className="border-[#CCCCCC] border rounded-sm p-1.5 px-3 w-full my-2"
          rows="2"
          {...register("costDesc", { max: [100, "Too Long Description"] })}
        ></textarea>

        <button
          type="submit"
          className="p-3 px-5 rounded-md bg-green text-white font-lightbold mt-4 mb-20"
        >
         {btnName} 
        </button>
      </form>
    </div>
  );
};

export default Updateprofile;
