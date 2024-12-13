import { PiChair } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import { TbArmchair } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiMirrorMirror } from "react-icons/gi";
import { FiMapPin } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function UserBanner() {
  const navigate = useNavigate();
  return (
    <div className="w-full  justify-evenly mt-10 hidden lg:flex px-4 gap-5 xl:px-0 xl:gap-0">
      {/* left */}
      <div className="flex gap-4 xl:gap-10">
        {/* iconbox */}
        <div
          className="flex items-center gap-2  cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Chairs");
          }}
        >
          <PiChair className="text-2xl" />
          <p className="text-base font-semibold ">Chairs</p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Storage");
          }}
        >
          <GrStorage className="text-2xl" />
          <p className="text-base font-semibold ">Storage</p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Armchairs");
          }}
        >
          <TbArmchair className="text-2xl" />
          <p className="text-base font-semibold ">Armchairs</p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Sofas");
          }}
        >
          <LuSofa className="text-2xl" />
          <p className="text-base font-semibold ">Sofas</p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Beds");
          }}
        >
          <IoBedOutline className="text-2xl" />
          <p className="text-base font-semibold ">Beds </p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Tables");
          }}
        >
          <MdOutlineTableRestaurant className="text-2xl" />
          <p className="text-base font-semibold ">Tables </p>
        </div>
        {/* iconbox */}
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-900"
          onClick={() => {
            navigate("/shop/product-category/Decor");
          }}
        >
          <GiMirrorMirror className="text-2xl" />
          <p className="text-base font-semibold ">Decor</p>
        </div>
      </div>
      {/* right */}
      <div className="flex gap-2 xl:gap-10">
        {/* adress box */}
        <div className="flex gap-2 items-center">
          <span className="block p-2 border rounded-full ">
            <FiMapPin className=" text-2xl text-gray-600 p-[2px] " />
          </span>
          <div>
            <p className="font-semibold text-xs xl:text-sm">Address:</p>
            <p className="whitespace-nowrap text-xs xl:text-sm">
              Street Name, NY 38954
            </p>
          </div>
        </div>
        {/* phone box */}
        <div className="flex gap-2 items-center">
          <span className="block p-2 border rounded-full ">
            <FiPhoneCall className=" text-2xl text-gray-600 p-[2px] " />
          </span>
          <div>
            <p className="font-semibold text-xs xl:text-sm">Phone:</p>
            <p className="whitespace-nowrap text-xs xl:text-sm">
              +212-637-177431
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
