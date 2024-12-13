import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export default function UserFooter() {
  return (
    <div className="w-full bg-[#eef3f6]">
      {/* brands */}
      <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-6 max-w-fit gap-10 md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto  w-full bg-[#eef3f6] py-10">
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-goldline.svg"
            alt=""
          />
        </div>
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-magnolia.svg"
            alt=""
          />
        </div>
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-boltshift.svg"
            alt=""
          />
        </div>
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-contrast.svg"
            alt=""
          />
        </div>
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-asgardia.svg"
            alt=""
          />
        </div>
        {/* brand logo */}
        <div className="w-28">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-komplex.svg"
            alt=""
          />
        </div>
      </div>
      {/* newsletter */}
      <div className="w-full bg-[#152421]">
        <div className="py-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-5 ">
          {/* left */}
          <div className="flex gap-5 ">
            <img
              src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/subscribe-section-image.webp"
              alt=""
              className="w-[60px] hidden lg:block"
            />
            <div>
              <p className="text-white font-bold text-lg lg:text-xl">
                Important updates waiting for you!
              </p>
              <p className="text-white text-base lg:text-lg text-center lg:text-left">
                Subscribe and grab 20% OFF!
              </p>
            </div>
          </div>
          {/* right */}

          <div className="relative flex flex-col md:flex-row items-center max-w-2xl w-full mx-10 gap-3 md:gap-0  px-10 md:px-0">
            <input
              type="email"
              placeholder="Your email *"
              required
              className="w-full bg-transparent border border-teal-800/30 rounded-full md:py-6 py-4 px-8 text-gray-300 placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-md"
            />
            <button
              type="submit"
              className="md:absolute w-full md:w-fit right-1 bg-teal-800 hover:bg-teal-700 text-white px-6 md:py-4 py-3 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* contact */}
      <div className="py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-5 border-b">
        <div>
          <p className="font-bold text-lg lg:text-xl text-center lg:text-left">
            Get in touch with us
          </p>
          <p className="lg:text-lg text-sm text-gray-500 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <div className="flex justify-center gap-10">
          {/* adress box */}
          <div className="flex gap-2 items-center">
            <span className="block p-2 border rounded-full ">
              <FiMapPin className=" lg:text-2xl text-xl text-gray-600 p-[2px] " />
            </span>
            <div>
              <p className="font-semibold text-sm lg:text-base">Address:</p>
              <p className="whitespace-nowrap text-sm lg:text-base">
                Street Name, NY 38954
              </p>
            </div>
          </div>
          {/* phone box */}
          <div className="flex gap-2 items-center">
            <span className="block p-2 border rounded-full ">
              <FiPhoneCall className=" lg:text-2xl text-xl text-gray-600 p-[2px] " />
            </span>
            <div>
              <p className="font-semibold text-sm lg:text-base">Phone:</p>
              <p className="whitespace-nowrap text-sm lg:text-base">
                +212-637-177431
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* links */}
      <div className="py-10 max-w-7xl mx-auto flex justify-between gap-5 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto lg:text-left text-center lg:grid-cols-4 w-full gap-5">
          {/* col 1 */}
          <div className="flex flex-col gap-4">
            <Link className="font-bold text-sm lg:text-base">
              Shop Categories
            </Link>
            <div className="flex flex-col gap-3 text-sm text-gray-500 lg:text-base ">
              <Link>Armchairs</Link>
              <Link>Beds</Link>
              <Link>Chairs</Link>
              <Link>Decor</Link>
              <Link>Sofas</Link>
              <Link>Storage</Link>
              <Link>Tables</Link>
            </div>
          </div>
          {/* col 2 */}
          <div className="flex flex-col gap-4">
            <Link className="font-bold text-sm lg:text-base">Useful Links</Link>
            <div className="flex flex-col gap-3 text-sm text-gray-500 lg:text-base">
              <Link>Careers</Link>
              <Link>Delivery</Link>
              <Link>Help Center</Link>
              <Link>Returns & Refunds</Link>
              <Link>Newsletter</Link>
              <Link>Status</Link>
              <Link>Testimonials</Link>
            </div>
          </div>
          {/* col 3 */}
          <div className="flex flex-col gap-4">
            <Link className="font-bold text-sm lg:text-base">Account</Link>
            <div className="flex flex-col gap-3 text-sm text-gray-500 lg:text-base">
              <Link>User Dashboard</Link>
              <Link>Wishlist</Link>
              <Link>Shipping & Delivery</Link>
              <Link>Affiliate Program</Link>
              <Link>Brand Assets</Link>
              <Link>Support</Link>
              <Link>Recommendations</Link>
            </div>
          </div>
          {/* col 4 */}
          <div className="flex flex-col gap-4">
            <Link className="font-bold text-sm lg:text-base">
              About Company
            </Link>
            <div className="flex flex-col gap-3 text-sm text-gray-500 lg:text-base">
              <Link>About Us</Link>
              <Link>Our Partners</Link>
              <Link>Locations</Link>
              <Link>Design Services</Link>
              <Link>How it Works</Link>
              <Link>Customers</Link>
              <Link>Other Info</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="py-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-5 border-b">
        <div className="text-sm lg:text-base">
          Copyright © {new Date().getFullYear()} - Bzioui Outmane
        </div>
        <div className="flex gap-4 text-[#42514c] text-lg lg:text-xl">
          <FaFacebook />
          <FaInstagramSquare />
          <FaSquareXTwitter />
          <FaLinkedin />
          <FaGithub />
        </div>
        <div className="flex gap-4 text-sm lg:text-base">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Site Map</p>
        </div>
      </div>
    </div>
  );
}
