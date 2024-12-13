import { Breadcrumb } from "flowbite-react";

export default function UserNews() {
  return (
    <div className="w-full">
      {/* banner  section */}
      <div className="flex justify-center items-center relative mx-5 md:mx-7 lg:mx-9 xl:mx-12">
        <div className="max-w-[1700px] w-full my-16 relative  h-[300px] lg:h-[400px]">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>

          {/* Image */}
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/about-us-hero-image.webp"
            alt=""
            className="rounded-3xl  h-[300px] lg:h-[400px] w-full object-cover"
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-3xl font-bold">
            <p className="pb-6">News</p>
            <Breadcrumb
              aria-label="Default breadcrumb example"
              className="text-white"
            >
              <Breadcrumb.Item href="#">
                <p className="text-white">Home</p>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" className="text-white">
                <p className="text-white">NEWS</p>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex py-10 gap-3  lg:max-w-7xl  mx-auto mb-28">
        {/* news */}
        <div className="grid grid-cols-1 lg:mx-3 gap-5 mx-auto md:grid-cols-2 lg:grid-cols-3  flex-1  w-full">
          {/* card */}
          <div className="max-w-[300px] flex-1 mx-auto w-full flex flex-col gap-3 rounded-3xl shadow-sm group ">
            <div className="overflow-hidden rounded-tl-3xl rounded-tr-3xl">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/article-image-5-768x589.webp"
                alt=""
                className="w-full transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <p className="text-sm cursor-pointer">IN ACCESSORIES</p>
              <p className="font-semibold text-xl cursor-pointer">
                Risus Pretium Quam Vulputate
              </p>
              <p className="text-gray-600 line-clamp-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                molestias enim ipsa in reiciendis accusantium quas amet voluptas
                quis id, asperiores neque totam voluptatum ratione blanditiis
                est nemo esse nisi.
              </p>
            </div>
          </div>
          {/* card */}
          <div className="max-w-[300px]  mx-auto w-full flex flex-col gap-3 rounded-3xl shadow-sm group ">
            <div className="overflow-hidden rounded-tl-3xl rounded-tr-3xl">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/article-image-9-768x589.webp"
                alt=""
                className="w-full transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <p className="text-sm cursor-pointer">IN ACCESSORIES</p>
              <p className="font-semibold text-xl cursor-pointer">
                Risus Pretium Quam Vulputate
              </p>
              <p className="text-gray-600 line-clamp-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                molestias enim ipsa in reiciendis accusantium quas amet voluptas
                quis id, asperiores neque totam voluptatum ratione blanditiis
                est nemo esse nisi.
              </p>
            </div>
          </div>
          {/* card */}
          <div className="max-w-[300px]  mx-auto w-full flex flex-col gap-3 rounded-3xl shadow-sm group ">
            <div className="overflow-hidden rounded-tl-3xl rounded-tr-3xl">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/article-image-8-768x589.webp"
                alt=""
                className="w-full transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <p className="text-sm cursor-pointer">IN ACCESSORIES</p>
              <p className="font-semibold text-xl cursor-pointer">
                Risus Pretium Quam Vulputate
              </p>
              <p className="text-gray-600 line-clamp-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                molestias enim ipsa in reiciendis accusantium quas amet voluptas
                quis id, asperiores neque totam voluptatum ratione blanditiis
                est nemo esse nisi.
              </p>
            </div>
          </div>
        </div>
        {/* right sidebar */}
        <div className="flex-col gap-5 hidden lg:flex">
          {/* card */}
          <div className="max-w-[300px] w-full flex flex-col rounded-3xl shadow-sm group  ">
            <div className="overflow-hidden rounded-tl-3xl rounded-tr-3xl">
              <img
                src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/newsletter-section-image-.webp"
                alt=""
                className="w-full transition-transform bg-[#152421] duration-300 group-hover:scale-110 cursor-pointer"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 bg-[#152421] pb-10 rounded-br-3xl rounded-bl-3xl">
              <p className="text-xl font-semibold cursor-pointer text-white">
                Subscribe now!
              </p>
              <p className="font-semibold  cursor-pointer text-white">
                Enter your email address below and subscribe to our newsletter
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-full text-white border-[3px] bg-[#152421] caret-white border-[#2f4949] w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
                <input
                  type="text"
                  placeholder="Your Email"
                  className="rounded-full text-white border-[3px] bg-[#152421] caret-white border-[#2f4949] w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-teal-800 hover:bg-teal-700 text-white px-6 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          {/* categories */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-lg g">Categories</p>
            <div className="flex flex-col gap-1">
              <p className="text-gray-700 text-lg">Accessories (2)</p>
              <p className="text-gray-700 text-lg">Decoration (3)</p>
              <p className="text-gray-700 text-lg">How To (3)</p>
              <p className="text-gray-700 text-lg">Process (2)</p>
            </div>
          </div>
          {/* best selling products */}
          <div className="flex flex-col gap-1 mt-5">
            <p className="text-xl font-semibold text-[#212b28]">
              Best selling products
            </p>
            <div className="flex flex-col gap-4">
              {/* product */}
              <div className="flex gap-2 items-center">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-35.webp"
                  alt=""
                  className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-lg">Aliquam Blandit</p>
                  <p>$320.00</p>
                </div>
              </div>
              {/* product */}
              <div className="flex gap-2 items-center">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-24.webp"
                  alt=""
                  className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-lg">Porta Non</p>
                  <p>$320.00</p>
                </div>
              </div>
              {/* product */}
              <div className="flex gap-2 items-center">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-25.webp"
                  alt=""
                  className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-lg">Diam Volutpat</p>
                  <p>$320.00</p>
                </div>
              </div>
              {/* product */}
              <div className="flex gap-2 items-center">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-26.webp"
                  alt=""
                  className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-lg">Porttitor Massa</p>
                  <p>$320.00</p>
                </div>
              </div>
              {/* product */}
              <div className="flex gap-2 items-center">
                <img
                  src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/product-27.webp"
                  alt=""
                  className="w-20 h-20 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-lg">Senectus Netus</p>
                  <p>$320.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
