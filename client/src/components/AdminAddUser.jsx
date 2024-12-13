import { Label, Select } from "flowbite-react";

export default function AdminAddUser() {
  return (
    <div>
      <div className="px-10 pt-5">
        <p className="text-2xl font-bold py-5">Add New User</p>
        <div className="bg-white p-10 rounded-xl flex">
          {/* left */}
          <div className=" text-center flex-1 flex justify-center items-center">
            {/* <div className="">
              <p className="text-lg font-bold">Account</p>
              <p>Fill in the information below to add a new account</p>
            </div> */}
            <img
              src="https://zupimages.net/up/24/46/5r68.png"
              alt=""
              className="w-[500px]"
            />
          </div>
          {/* right */}
          <div className="flex-1">
            {/* left */}
            <div className="flex-1 bg-white  rounded-3xl p-6">
              <form className="flex flex-col gap-5">
                <div className="flex gap-5 w-full ">
                  <div className="flex flex-col flex-1">
                    <Label
                      htmlFor="default-search"
                      className="text-[#989d91] text-lg"
                    >
                      User Name
                    </Label>
                    <input
                      type="text"
                      className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label
                    className="text-[#989d91] text-lg"
                    htmlFor="default-search"
                  >
                    Email
                  </Label>
                  <input
                    type="text"
                    className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  />
                </div>
                {/* Role */}
                <div className="flex flex-1 flex-col">
                  <Label
                    className="text-[#989d91] text-lg"
                    htmlFor="default-search"
                  >
                    Role
                  </Label>
                  <Select
                    id="keyword"
                    className="rounded-full border-[3px] border-gray-100 w-full  focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Select>
                </div>
                {/*  password */}
                <div className="flex flex-col">
                  <Label
                    className="text-[#989d91] text-lg"
                    htmlFor="default-search"
                  >
                    Password
                  </Label>
                  <input
                    type="text"
                    className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  />
                </div>{" "}
                {/*confirm password */}
                <div className="flex flex-col">
                  <Label
                    className="text-[#989d91] text-lg"
                    htmlFor="default-search"
                  >
                    Confirm Password
                  </Label>
                  <input
                    type="text"
                    className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  />
                </div>
                <button className="bg-[#264c4f] text-white px-10 py-3 rounded-full w-fit text-lg">
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
