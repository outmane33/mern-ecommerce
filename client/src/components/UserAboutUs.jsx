import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";

export default function UserAboutUs() {
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
            <p className="pb-6">About Us</p>
            <Breadcrumb
              aria-label="Default breadcrumb example"
              className="text-white"
            >
              <Breadcrumb.Item href="#">
                <p className="text-white">Home</p>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" className="text-white">
                <p className="text-white">ABOUT US</p>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      {/* description section */}
      <div className="flex gap-10 py-10 max-w-7xl mx-auto">
        <div className="w-full flex flex-col gap-10">
          <p className="md:text-3xl text-2xl font-bold text-[#1b231c] text-center max-w-3xl mx-auto">
            Adipiscing ullamcorper ultricies massa scelerisque magnis quisque
            eget parturient nam
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-600 text-[17px] px-4 text-center md:text-left">
            <p>
              Lorem ipsum dolor sit amet consectetur. Blandit at maecenas dui
              sed amet sit enim vitae. Amet purus dictum urna sagittis
              dignissim. At fermentum nisl ullamcorper orci. Pellentesque id
            </p>
            <p>
              Augue quis cras blandit habitant neque. Faucibus vestibulum id
              nisi ligula ultricies et vehicula. Et adipiscing mattis egestas mi
              placerat duis congue id. Scelerisque integer pulvinar justo sed
              eget.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. Blandit at maecenas dui
              sed amet sit enim vitae. Amet purus dictum urna sagittis
              dignissim. At fermentum nisl ullamcorper orci. Pellentesque id
              tempor lacus aliquet tempus vitae nibh habitasse consectetur.
            </p>
            <p>
              Augue quis cras blandit habitant neque. Faucibus vestibulum id
              nisi ligula ultricies et vehicula.
            </p>
          </div>
        </div>
      </div>
      {/* Team section  */}
      <div className="w-full flex flex-col gap-4  justify-center items-center py-10">
        <h2 className="text-[#102238] lg:text-3xl text-2xl font-bold">
          Our team
        </h2>
        <p className="max-w-[570px] w-full mb-[50px] text-base lg:text-lg px-3 lg:p-0 text-gray-500 text-center">
          Quam elementum pulvinar etiam non quam. Faucibus nisl tincidunt eget
          nullam non nisi elementum sagittis vitae et leo duis ut diam quam.
        </p>
      </div>

      {/* team section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 py-10 max-w-7xl mx-auto px-4">
        {/* member 1 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto  w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-1.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base lg:text-lg">Libby Lynch</p>
            <p className="text-base">Seller</p>
          </div>
        </div>
        {/* member 2 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-2.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base">Elvis Morgan</p>
            <p>Seller</p>
          </div>
        </div>
        {/* member 3 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-3.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base">Aron Bowers</p>
            <p>Seller</p>
          </div>
        </div>
        {/* member 4 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-4.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base">Melany Ellis</p>
            <p>Manager</p>
          </div>
        </div>
        {/* member 5 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-5.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base">Libby Lynch</p>
            <p>Boss</p>
          </div>
        </div>
        {/* member 6 */}
        <div className="lg:max-w-[450px] max-w-[400px] mx-auto w-full relative">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/team-member-6.webp"
            alt=""
            className="rounded-3xl oject-cover"
          />
          <div className="bg-white rounded-3xl p-5 px-7 absolute bottom-0 left-0 m-5">
            <p className="font-bold text-base">Emilie Beck</p>
            <p>Boss’s wife</p>
          </div>
        </div>
      </div>

      {/* Learn More*/}
      <div className="w-full flex  justify-center items-center my-28">
        <div className="flex flex-col md:flex-row px-8 items-center justify-center gap-12 max-w-[1300px] w-full   rounded-3xl mt-10">
          {/* one */}
          <div className=" flex-1 flex flex-col gap-8 text-center md:text-left">
            <p className="text-3xl  md:text-4xl lg:text-5xl font-bold text-[#152421 leading-tight">
              Furniture that will last a lifetime
            </p>
            <p className="text-gray-600 text-base md:text-[15px] lg:text-[17px]  leading-relaxed">
              Sit massa etiam urna id. Non pulvinar aenean ultrices lectus vitae
              imperdiet vulputate a eu. Aliquet ullamcorper leo mi vel sit
              pretium euismod eget libero. Nullam iaculis vestibulum arcu id
              urna. In pellentesque volutpat quis condimentum lectus
            </p>
            <Link to={"/shop/listing"}>
              <button className="bg-[#264c4f] text-white px-10 py-4 rounded-full w-fit text-base font-semnibold lg:text-lg">
                Learn More
              </button>
            </Link>
          </div>

          {/* two */}
          <div className=" flex-1 ">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/about-us-cta-image.webp"
              alt=""
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
