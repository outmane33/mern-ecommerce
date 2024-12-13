import {
  Avatar,
  Drawer,
  Dropdown,
  Label,
  Navbar,
  Spinner,
  Toast,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import {
  cartStart,
  cartSuccess,
  cartFailure,
  cartUpdateQuantity,
  removeFromCart,
  removeFromCartStart,
  removeFromCartFailure,
  updateTotalPrice,
  updateCartCount,
} from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { MdOutlineChair } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { wishlistCount } from "../redux/actions/userActions";
import { PiChair } from "react-icons/pi";
import { GrStorage } from "react-icons/gr";
import { TbArmchair } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { GiMirrorMirror } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { loginSuccess, loginFailure } from "../redux/actions/authActions";

export default function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const mywishlistCount = useSelector((state) => state.user.wishlistCount);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);
  const handleToggleClose = () => setIsOpenToggle(false);

  const fetchCartData = async () => {
    console.log(user);
    try {
      dispatch(cartStart());
      const res = await fetch("/api/v1/cart", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartSuccess(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
        dispatch(updateCartCount(data.numberOfItems));
      } else {
        dispatch(cartFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(cartFailure(error.message));
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [location.pathname, dispatch]);

  const handleQuantity = async (id, quantity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/v1/cart/updateQuantity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartUpdateQuantity(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
      }
    } catch (error) {
      console.error("Quantity update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrementQuantity = (id, quantity) => {
    if (!isLoading) handleQuantity(id, quantity + 1);
  };

  const handleDecrementQuantity = (id, quantity) => {
    if (!isLoading && quantity > 1) handleQuantity(id, quantity - 1);
  };

  const handleRemoveFromCart = async (id) => {
    try {
      setIsLoading(true);
      dispatch(removeFromCartStart());

      const res = await fetch(`/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        // Update the Redux store with the new cart items
        dispatch(removeFromCart(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));

        // Optionally fetch the latest cart data to ensure consistency
        await fetchCartData();
      } else {
        dispatch(removeFromCartFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(removeFromCartFailure(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/auth/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(logout());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserWishlist = async () => {
      try {
        const res = await fetch("/api/v1/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          dispatch(wishlistCount(data.wishList.length));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserWishlist();
  }, [location.pathname]);

  const handleToast = () => {
    setShowToast(true);
    // Auto-hide after 5 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const LoginModal = ({ isOpenLogin, onClose }) => {
    const [signUp, setSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (signUp) {
        if (!formData.userName || !formData.email || !formData.password) {
          dispatch(loginFailure("All fields are required"));
          return;
        }
        try {
          setLoading(true);
          const res = await fetch("/api/v1/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const data = await res.json();
          if (data.status === "success") {
            setLoading(false);
            setFormData({ userName: "", email: "", password: "" });
            dispatch(loginSuccess(data.user));
            setIsOpenLogin(false);
            window.location.reload();
          } else {
            dispatch(loginFailure(data.errors[0].msg));
            setLoading(false);
          }
        } catch (error) {
          dispatch(loginFailure(error));
          setLoading(false);
        }
      } else {
        if (!formData.email || !formData.password) {
          dispatch(loginFailure("All fields are required"));
          return;
        }
        try {
          setLoading(true);
          const res = await fetch("/api/v1/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.status === "success") {
            dispatch(loginSuccess(data.user));
            handleToast();
            setLoading(false);
            if (data.user.role === "admin") {
              navigate("/admin/dashboard");
            } else {
              setIsOpenLogin(false);
              window.location.reload();
            }
          } else {
            dispatch(loginFailure(data.errors[0].msg));
          }
        } catch (error) {
          dispatch(loginFailure(error));
        }
      }
    };

    if (!isOpenLogin) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] relative p-20">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {/* Content */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* UserName */}
              {signUp && (
                <div className="flex flex-col">
                  <Label className="text-[#989d91] text-sm">User Name</Label>
                  <input
                    type="text"
                    className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col">
                <Label className="text-[#989d91] text-sm">Email Address</Label>
                <input
                  type="email"
                  className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <Label className="text-[#989d91] text-sm">Password</Label>
                <input
                  type="password"
                  className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Sign up & forgot password */}
              <div className="flex justify-between">
                <Label
                  className="text-[#989d91] text-sm cursor-pointer"
                  onClick={() => setSignUp(!signUp)}
                >
                  {signUp ? "Login" : "Sign Up"}
                </Label>
                <Label className="text-[#989d91] text-sm cursor-pointer">
                  Forgot Password?
                </Label>
              </div>

              <button
                className="bg-[#264c4f] text-white w-full px-5 lg:px-10 py-3 lg:py-3 rounded-full text-base lg:text-lg"
                type="submit"
              >
                {loading ? <Spinner /> : signUp ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar className="sticky top-0 z-10 py-6 shadow-sm">
        <Link to="/shop">
          <div className="order-1 flex items-center gap-2 px-3">
            <MdOutlineChair className="text-3xl md:text-4xl" />
            <p className="text-xl  md:text-2xl font-semibold">Furniture</p>
          </div>
        </Link>
        <Navbar.Collapse className="order-3 sm:order-2 hidden md:flex">
          <Navbar.Link as={"div"}>
            <Link to="/shop" className="text-base">
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to={"/shop/listing"} className="text-base">
              Shop
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to={"/shop/about-us"} className="text-base">
              About Us
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to={"/shop/news"} className="text-base">
              News
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to={"/shop/contact-us"} className="text-base">
              Contact Us
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="flex gap-3 order-2 sm:order-3">
          <button
            className=" py-2 px-2 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            <Link className="relative">
              <AiOutlineShopping
                className="text-xl text-[#1c2b26]"
                onClick={() => setIsOpen(true)}
              />
              <span
                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#264c4f] text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                  cartCount <= 0 && "hidden"
                }`}
              >
                {cartCount}
              </span>
            </Link>
          </button>
          <button
            className=" py-2 px-2 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            <Link to="/shop/wishlist" className="relative">
              <IoIosHeartEmpty className="text-xl text-[#1c2b26]" />
              <span
                className={`absolute top-[-5px] right-[-10px] text-xs bg-[#264c4f] text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center ${
                  mywishlistCount <= 0 && "hidden"
                }`}
              >
                {mywishlistCount}
              </span>
            </Link>
          </button>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={FaRegCircleUser}
                rounded
                size="xs"
                className="text-[#1c2b26] hidden md:block"
                onClick={() => setIsOpenLogin(true)}
              />
            }
          >
            {user ? (
              <>
                <Dropdown.Header>
                  <p className="font-semibold text-sm">
                    {user.userName ? `Logged in as ${user.userName}` : ""}
                  </p>
                </Dropdown.Header>
                <Dropdown.Item
                  className="flex gap-2"
                  onClick={() => navigate("/shop/acount")}
                >
                  <FaUserCog className="text-lg" />
                  Acount
                </Dropdown.Item>
                <Dropdown.Item className="flex gap-2" onClick={handleLogout}>
                  <MdLogout className="text-lg" />
                  Logout
                </Dropdown.Item>
              </>
            ) : (
              ""
            )}
          </Dropdown>
          <Navbar.Toggle onClick={() => setIsOpenToggle(true)} />
        </div>
      </Navbar>
      {/* cart drawer */}
      <Drawer
        className="w-[400px] md:w-[500px] "
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header title="Your Cart" titleIcon={() => <></>} />
        <Drawer.Items>
          <div className="flex flex-col justify-between ">
            <div className="flex flex-col gap-6">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-10 px-5">
                    {/* image */}
                    <img
                      src={item.product.imageCover}
                      alt=""
                      className="w-20 h-20"
                    />
                    {/* content */}
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="font-semibold text-lg">
                        {item.product.title}
                      </p>
                      <div className="flex items-center gap-8">
                        {/* quantity */}
                        <div className="flex gap-2 border border-[#264c4f] px-2 py-[6px] rounded-full">
                          <p
                            className="hover:bg-[#264c4f] flex items-center justify-center rounded-full px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleIncrementQuantity(item._id, item.quantity)
                            }
                          >
                            +
                          </p>
                          <p className="text-gray-600">{item.quantity}</p>
                          <p
                            className="hover:bg-[#264c4f] rounded-full flex items-center justify-center px-2 hover:text-white cursor-pointer transition-all duration-300"
                            onClick={() =>
                              handleDecrementQuantity(item._id, item.quantity)
                            }
                          >
                            -
                          </p>
                        </div>
                        <p>${item.product.price}.00</p>
                      </div>
                    </div>
                    {/* remove */}
                    <div>
                      <FiTrash
                        className="text-lg cursor-pointer"
                        onClick={() => handleRemoveFromCart(item._id)}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="">
              <hr />
              <div className="flex w-full justify-between py-5">
                <p className="text-lg text-[#264c4f] font-semibold">
                  SUBTOTAL:
                </p>
                <p className="text-lg text-[#264c4f] font-semibold">
                  {totalPrice} MAD
                </p>
              </div>

              <div className="flex">
                <button
                  className="bg-teal-800 flex-1 hover:bg-teal-700 text-white px-6 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
                  onClick={() => {
                    navigate("/shop/cart");
                    setIsOpen(false);
                  }}
                >
                  View Cart
                </button>
                <button
                  className="bg-teal-800 flex-1 hover:bg-teal-700 text-white px-6 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
                  onClick={() => {
                    navigate("/shop/checkout");
                    setIsOpen(false);
                  }}
                >
                  Checout
                </button>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      {/* mobile drawer */}
      <Drawer
        open={isOpenToggle}
        onClose={handleToggleClose}
        position="right"
        className="bg-[#14171c] text-[#9a9b9d] flex flex-col gap-4 font-bold text-[17px]"
      >
        <Drawer.Header titleIcon={() => <></>} />
        <Drawer.Items>
          <Link to="/shop">
            <div className="pb-5 flex items-center gap-2">
              <MdOutlineChair className="text-4xl text-white" />
              <p className="text-2xl font-semibold text-white">Furniture</p>
            </div>
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <Link
            to="/shop"
            className="hover:text-white transition-all duration-200"
          >
            Home
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <Link
            to="/shop/listing"
            className="hover:text-white transition-all duration-200"
          >
            Shop
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <Link
            to="/shop/about-us"
            className="hover:text-white transition-all duration-200"
          >
            About Us
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <Link
            to="/shop/news"
            className="hover:text-white transition-all duration-200"
          >
            News
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <Link
            to="/shop/contact-us"
            className="hover:text-white transition-all duration-200"
          >
            Contact Us
          </Link>
        </Drawer.Items>
        <Drawer.Items>
          <div className="w-full h-[1px] bg-[#2d2e31] my-5"></div>
        </Drawer.Items>
        {/* categories */}
        <div className="flex flex-col gap-3 ">
          <Drawer.Items>
            <Link
              to="/shop/product-category/Chairs"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <PiChair className="text-xl" />
              <p className="text-base text-[18px] ">Chairs</p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Storage"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <GrStorage className="text-xl" />
              <p className="text-base text-[18px] ">Storage</p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Armchairs"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <TbArmchair className="text-xl" />
              <p className="text-base text-[18px] ">Armchairs</p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Sofas"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <LuSofa className="text-xl" />
              <p className="text-base text-[18px] ">Sofas</p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Beds"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <IoBedOutline className="text-xl" />
              <p className="text-base text-[18px] ">Beds </p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Tables"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <MdOutlineTableRestaurant className="text-xl" />
              <p className="text-base text-[18px] ">Tables </p>
            </Link>
          </Drawer.Items>
          <Drawer.Items>
            <Link
              to="/shop/product-category/Decor"
              className="hover:text-white transition-all duration-200 flex items-center gap-2"
            >
              <GiMirrorMirror className="text-xl" />
              <p className="text-base text-[18px] ">Decor</p>
            </Link>
          </Drawer.Items>
        </div>
      </Drawer>
      {/* Login moadl */}
      {!user && (
        <div className="p-4">
          <LoginModal
            isOpenLogin={isOpenLogin}
            onClose={() => setIsOpenLogin(false)}
            title={"title"}
          />
        </div>
      )}
      {showToast ? (
        <Toast className="absolute bottom-5 right-5">
          <div className="text-sm font-normal">Logged in successfully</div>
          <div className="ml-auto flex items-center space-x-2"></div>
          <Toast.Toggle />
        </Toast>
      ) : (
        ""
      )}
    </>
  );
}
