import { Avatar, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import UserProductCard from "./UserProductCard";
import {
  productStart,
  productSuccess,
  productFailure,
} from "../redux/actions/productActions";
import { useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function UserHome() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const getAllProducts = async (query) => {
    try {
      dispatch(productStart());
      const res = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(productSuccess(data.products));
      } else {
        dispatch(productFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(productFailure(error));
    }
  };

  useEffect(() => {
    getAllProducts(`/api/v1/product?limit=8`);
  }, [location.pathname]);

  return (
    <div>
      {/* banner 2 section */}
      <div className="w-full flex justify-center items-center mb-12 px-5 lg:px-0">
        <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4 max-w-[1700px] w-full bg-[#eef3f6] p-10 rounded-3xl mt-10">
          {/* one */}
          <div className="p-1 lg:p-20 flex-1">
            <div className="flex flex-col items-center lg:items-start gap-10">
              <h2 className="text-4xl md:text-4xl lg:text-6xl font-bold text-[#152421] leading-tight text-center lg:text-left xl:leading-snug">
                Exquisite design combined with functionalities
              </h2>
              <p className="text-lg lg:text-xl text-center max-w-[300px] sm:max-w-[500px]">
                Pellentesque ullamcorper dignissim condimentum volutpat
                consequat mauris nunc lacinia quis.
              </p>
              {/* images */}
              <div className=" items-center bg-[#e2edef] pl-3 pr-10 py-2 w-fit rounded-full hidden lg:flex">
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                  rounded
                />
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  rounded
                />
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  rounded
                />
                <p className="text-lg font-semibold pl-5">
                  Contact with our expert
                </p>
              </div>
              <Link to={"/shop/listing"}>
                <button className="bg-[#264c4f] text-white px-10 py-4  rounded-full w-fit text-lg mb-3">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          {/* group */}
          <div className="md:flex-row flex flex-col gap-10 flex-1 lg:h-[600px]">
            {/* two */}
            <div className="max-w-[350px] w-full relative h-[550px] lg:h-full">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/home-hero-image-1.webp"
                alt=""
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="bg-white rounded-2xl py-3 px-5 absolute top-0 left-0 m-4">
                <p className="font-bold text-[#0f232e]">Wooden Chair</p>
                <p>$199</p>
              </div>
              <div className="absolute bottom-0 m-5">
                <Button outline pill className="px-3 py-1 bg-white">
                  <HiOutlineArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
            {/* three */}
            <div className="flex flex-col gap-5 justify-between  max-w-[350px]  w-full relative h-[550px]  lg:h-full ">
              {/* top */}
              <div className=" h-[270px] lg:h-full  md:h-[300px]  flex-1 rounded-3xl relative">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/home-hero-image-2.webp"
                  alt=""
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="bg-white rounded-2xl p-3 absolute top-0 left-0 m-4">
                  <p className="font-bold text-[#0f232e]">Pretium Elite</p>
                  <p>$130</p>
                </div>
                <div className="absolute bottom-0 m-5">
                  <Button outline pill className="px-3 py-1 bg-white">
                    <HiOutlineArrowRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              {/* bottom */}
              <div className="bg-[#264c4f] md:flex-1 h-[200px] lg:h-[200px] rounded-3xl flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold text-white whitespace-nowrap">
                  25% OFF
                </p>
                <p className="text-base text-white whitespace-nowrap">
                  Donec ac odio tempor dapibus.
                </p>
                <Link to={"/shop/listing"}>
                  <button className="text-white bg-[#446a6d] text-sm font-semibold px-10 py-4 rounded-full mt-7">
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bestsellers section  */}
      <div className="w-full flex flex-col gap-4  justify-center items-center py-10">
        <h2 className="text-[#102238] lg:text-3xl text-2xl font-bold">
          Bestsellers of the week
        </h2>
        <p className="max-w-[570px] w-full mb-[50px] text-base lg:text-lg px-3 lg:p-0 text-gray-500 text-center">
          Quam elementum pulvinar etiam non quam. Faucibus nisl tincidunt eget
          nullam non nisi elementum sagittis vitae et leo duis ut diam quam.
        </p>
      </div>

      {/* products section */}
      <div className="grid grid-cols-1 gap-5 py-10 max-w-fit lg:max-w-7xl  mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 xl:grid-cols-4">
        {/* product */}
        {products &&
          products.map((product) => (
            <UserProductCard key={product._id} product={product} />
          ))}
      </div>

      {/* Browse by rooms */}
      <div className="w-full flex justify-center items-center mb-12 px-2  ">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-[1300px] w-full bg-[#152421] p-10 rounded-3xl mt-10">
          {/* one */}
          <div className=" flex-1 flex flex-col gap-5 ">
            <div className="flex flex-col gap-5 ">
              <p className="text-3xl font-bold text-white ">Browse by rooms</p>
              <p className="text-white text-lg ">
                Sit massa etiam urna id. Non pulvinar aenean ultrices lectus
                vitae imperdiet vulputate a eu. Aliquet ullamcorper leo mi vel
                sit pretium euismod eget.
              </p>
              <div className="relative w-full">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/browse-by-rooms-image-1-1.webp"
                  alt=""
                  className="rounded-3xl w-[100%] lg:h-full h-[300px] object-cover"
                />
                <div className="bg-white rounded-3xl p-5 px-7 absolute  bottom-0 left-0 m-5">
                  <p className="font-semibold text-lg">Living Room</p>
                  <p>15 products</p>
                </div>
              </div>
            </div>
          </div>

          {/* two */}
          <div className=" flex-1 flex flex-col gap-5">
            {/* top */}
            <div className="relative w-[100%] h-[300px]">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/browse-by-rooms-image-2-1.webp"
                alt=""
                className="rounded-3xl w-[100%]  h-[300px] object-cover"
              />
              <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
                <p className="font-semibold text-lg">Bedroom</p>
                <p>24 products</p>
              </div>
            </div>
            {/* bottom */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* left */}
              <div className="relative w-[100%] h-[300px]">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/browse-by-rooms-image-3.webp"
                  alt=""
                  className="rounded-3xl w-[100%] h-[300px] object-cover"
                />
                <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
                  <p className="font-semibold text-lg">Walk-in Closet</p>
                  <p>30 products</p>
                </div>
              </div>
              {/* right */}
              <div className="relative w-[100%] h-[300px]">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/browse-by-rooms-image-4-1.webp"
                  alt=""
                  className="rounded-3xl w-[100%] h-[300px]  object-cover"
                />
                <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
                  <p className="font-semibold text-lg">Kitchen</p>
                  <p>24 products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bestsellers section  */}
      <div className="w-full flex flex-col gap-4  justify-center items-center py-10">
        <h2 className="text-[#102238] lg:text-3xl text-2xl font-bold">
          Top selling furniture
        </h2>
        <p className="max-w-[570px] w-full mb-[50px] text-base lg:text-lg px-3 lg:p-0 text-gray-500 text-center">
          Quam elementum pulvinar etiam non quam. Faucibus nisl tincidunt eget
          nullam non nisi elementum sagittis vitae et leo duis ut diam quam.
        </p>
      </div>

      {/* products section */}

      <div className="grid grid-cols-1 gap-5 py-10 max-w-fit lg:max-w-7xl  mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 xl:grid-cols-4">
        {/* product */}
        {products &&
          products.map((product) => (
            <UserProductCard key={product._id} product={product} />
          ))}
      </div>

      {/* Special offers section */}
      <div className="py-10 max-w-7xl mx-auto flex flex-col lg:flex-row  justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-center lg:text-start">
            Special offers
          </p>
          <p className="text-gray-500 text-lg hidden lg:block">
            Quam elementum pulvinar etiam non quam tincidunt eget nullam non.
          </p>
        </div>
        <div className="self-center lg:self-center mt-5 lg:mt-0">
          <Link to={"/shop/listing"}>
            <Button pill className="bg-[#254c4f]">
              <div className="flex px-2 lg:py-1  gap-2">
                <p className="text-lg">See All</p>
                <HiOutlineArrowRight className="h-6 w-6" />
              </div>
            </Button>
          </Link>
        </div>
      </div>

      {/* offers */}
      <div className="py-10 max-w-7xl mx-auto flex flex-col md:flex-row px-3 lg:flex-row justify-between gap-5">
        {/* offer 1*/}
        <div className="flex md:flex-col lg:flex-row items-center bg-[#9ba89e] px-5 rounded-3xl">
          {/* left */}
          <div className="max-w-[150px] lg:max-w-[150px] md:max-w-full w-full py-5 md:pt-5 ">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/offers-image-1.webp"
              alt=""
              className="rounded-3xl md:h-[250px] lg:h-auto  md:w-full lg:w-auto"
            />
          </div>
          {/* right */}
          <div className="flex flex-col gap-4 p-5">
            <p className="text-xl text-white font-bold">
              Special Discount 30% OFF
            </p>
            <p className="text-white text-lg">
              Aliquet sagittis purus faucibus egestas.
            </p>
            <Link to={"/shop/listing"}>
              <button className="text-lg whitespace-nowrap w-fit bg-white text-[#254c4f] font-semibold px-8 py-3 rounded-full">
                Browse Now
              </button>
            </Link>
          </div>
        </div>
        {/* offer 2*/}
        <div className="flex md:flex-col lg:flex-row items-center bg-[#d39e76] px-5 rounded-3xl">
          {/* left */}
          <div className="max-w-[150px] lg:max-w-[150px] md:max-w-full w-full py-5 md:pt-5 ">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/offers-image-3.webp"
              alt=""
              className="rounded-3xl md:h-[250px] lg:h-auto  md:w-full lg:w-auto"
            />
          </div>
          {/* right */}
          <div className="flex flex-col gap-4 p-5">
            <p className="text-xl text-white font-bold">
              Weekly Discount 25% OFF
            </p>
            <p className="text-white text-lg">
              Nulla facilisi cras fermentum odio feugiat.
            </p>
            <Link to={"/shop/listing"}>
              <button className="text-lg whitespace-nowrap w-fit bg-white text-[#254c4f] font-semibold px-8 py-3 rounded-full">
                Browse Now
              </button>
            </Link>
          </div>
        </div>
        {/* offer 3*/}
        <div className="flex md:flex-col lg:flex-row items-center bg-[#a7a29c] px-5 rounded-3xl">
          {/* left */}
          <div className="max-w-[150px] lg:max-w-[150px] md:max-w-full w-full py-5 md:pt-5">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/offers-image-2.webp"
              alt=""
              className="rounded-3xl md:h-[250px] lg:h-auto  md:w-full lg:w-auto"
            />
          </div>
          {/* right */}
          <div className="flex flex-col gap-4 p-5">
            <p className="text-xl text-white font-bold">
              Birthday Discount 40% OFF
            </p>
            <p className="text-white text-lg">
              Porta non pulvinar neque laoreet suspendisse.
            </p>
            <Link to={"/shop/listing"}>
              <button className="text-lg whitespace-nowrap w-fit bg-white text-[#254c4f] font-semibold px-8 py-3 rounded-full">
                Browse Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Browse by rooms */}
      <div className="w-full flex justify-center items-center my-28 lg:p-10 p-3">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-[1300px] w-full   rounded-3xl mt-10">
          {/* one */}
          <div className=" flex-1 flex flex-col gap-8">
            <p className="text-3xl text-center lg:text-left lg:text-4xl xl:text-5xl  font-bold text-[#152421 leading-tight lg:leading-normal xl:leading-snug">
              Luxurious Furniture Starts with the Best Quality Materials
            </p>
            <p className="text-gray-500 text-base lg:text-lg text-center lg:text-left leading-relaxed px-2 lg:px-0">
              Donec et odio pellentesque diam volutpat commodo amet consectetur
              adipiscing elit ut aliquam purus vitae et leo duis ut diam quam
              nulla porttitor. Sodales ut eu sem integer vitae justo eget magna.
            </p>
            <Link to={"/shop/about-us"} className="text-center lg:text-left">
              <button className="bg-[#264c4f] text-white lg:px-10 px-6 lg:py-4 py-3 rounded-full w-fit lg:text-lg text-base">
                Learn More
              </button>
            </Link>
          </div>

          {/* two */}
          <div className=" flex-1 ">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/home-mask-image.webp"
              alt=""
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
