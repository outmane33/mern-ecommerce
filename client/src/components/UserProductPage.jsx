import {
  Alert,
  Breadcrumb,
  Button,
  Label,
  Modal,
  Rating,
} from "flowbite-react";
import { FaHeart } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Tabs } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  cartSuccess,
  updateCartCount,
  updateTotalPrice,
} from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { AiFillDislike } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import moment from "moment";

export default function UserProductPage() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const { category } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [formComment, setFormComment] = useState({});
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const loggedUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/v1/product/slug/${category}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [location.pathname]);

  // Separate useEffect for comments that depends on product
  useEffect(() => {
    const getComments = async () => {
      if (!product?._id) return; // Don't fetch if no product ID

      try {
        const res = await fetch(`/api/v1/comment?product=${product._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [product]); // This will run whenever product changes

  const dispatch = useDispatch();
  const handleAddToCard = async () => {
    try {
      const res = await fetch("/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: quantity }),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(cartSuccess(data.cart.cartItems));
        dispatch(updateTotalPrice(data.cart.totalCartPrice));
        dispatch(updateCartCount(data.numberOfItems));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await fetch("/api/v1/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        console.log("added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncerementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleChange = (e) => {
    setFormComment({
      ...formComment,
      [e.target.id]: e.target.value,
      productId: product._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formComment.content || !formComment.title) {
      setError("All fields are required");
      return;
    }
    if (!loggedUser) {
      setError("You must be logged in to comment");
      return;
    }

    try {
      const res = await fetch("/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formComment),
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments([...comments, data.comment]);
        setFormComment({});
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleLike = async (commentId) => {
    if (!loggedUser) {
      navigate("/sign-in");
      return;
    }

    try {
      const res = await fetch(`/api/v1/comment/like/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.comment.likes,
                  numberOfLikes: data.comment.numberOfLikes,
                }
              : comment
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/comment/${selectedComment._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setComments(comments.filter((c) => c._id !== selectedComment._id));
        setSelectedComment(null);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full py-28">
      {/* imng & little description section */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* left */}
        <div className="flex-1 mx-5 lg:mx-0">
          <img src={product.imageCover} alt="" className="w-[6 00px]" />
        </div>
        {/* right */}
        <div className="flex-1 flex gap-8 pl-10 pt-4 flex-col ">
          <Breadcrumb
            aria-label="Default breadcrumb example"
            className="text-[#234e54]"
          >
            <Breadcrumb.Item href="#">
              <p className="text-[#234e54] text-xs ">HOME</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#234e54] text-xs">SHOP</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#234e54] text-xs uppercase">
                {product.category}
              </p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-white">
              <p className="text-[#234e54] text-xs uppercase">
                {product.title}
              </p>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-bold">{product.title}</p>
            <p className="text-xl font-bold text-[#162320]">
              ${product.price}.00
            </p>
          </div>
          <p className="text-gray-500">
            {product.description
              ? product.description.split("<br/>")[0]
                ? product.description.split("<br/>")[0]
                : ""
              : ""}
          </p>
          <p className="text-gray-500">
            {product.description
              ? product.description.split("<br/>")[1]
                ? product.description.split("<br/>")[1]
                : ""
              : ""}
          </p>
          <hr />
          <div className="flex gap-2 items-center">
            {/* quantity */}
            <div className="flex items-center text-lg gap-2 border border-[#264c4f] px-6 py-2   rounded-full w-fit">
              <p
                className="hover:bg-[#264c4f] flex items-center justify-center  rounded-full px-3 py-1 hover:text-white cursor-pointer transition-all duration-200 "
                onClick={handleIncerementQuantity}
              >
                +
              </p>
              <p className="text-gray-600" id="quantity">
                {quantity}
              </p>

              <p
                className="hover:bg-[#264c4f] rounded-full px-4 py-1 hover:text-white cursor-pointer transition-all duration-200"
                onClick={handleDecrementQuantity}
              >
                -
              </p>
            </div>
            <button
              className="bg-[#264c4f] w-full lg:w-fit whitespace-nowrap  hover:bg-teal-700 text-white px-14 py-4 rounded-full transition-colors duration-200 mr-2 font-semibold text-base"
              onClick={handleAddToCard}
            >
              Add to Cart
            </button>
          </div>
          <div
            className="flex gap-2 items-center  font-semibold cursor-pointer"
            onClick={handleWishlist}
          >
            <FaHeart className="text-gray-400 hover:text-[#456a6d]" />
            <p className="text-[#456a6d]">Wishlist</p>
          </div>
          <hr />
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-goldline.svg"
            alt=""
            className="w-20"
          />
          <hr />
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 text-sm">
              <strong className="text-[#46585a] ">CATEGORY:</strong>
              <p className="text-gray-500">TABLES</p>
            </div>
            <div className="flex text-[#456a6d] gap-5 text-base">
              <FaFacebook />
              <FaInstagramSquare />
              <FaSquareXTwitter />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
      {/* product details */}
      <div className=" flex pt-16 items-center justify-center max-w-7xl mx-auto ">
        <div className="flex justify-center w-full">
          <Tabs variant="default" className="flex items-center justify-center">
            <Tabs.Item active title="DESCRIPTION" id="mytab">
              <div className="w-full flex flex-col text-[17px] gap-6 text-gray-600 px-4 md:px-6 lg:px-8 text-center md:text-left">
                <p>
                  Sit amet nulla facilisi morbi tempus iaculis. Phasellus
                  vestibulum lorem sed risus ultricies tristique. Urna neque
                  viverra justo nec ultrices dui sapien eget mi. Dignissim
                  sodales ut eu sem integer vitae justo.
                </p>
                <p>
                  Porttitor lacus luctus accumsan tortor posuere ac ut. Amet
                  luctus venenatis lectus magna fringilla urna. At erat
                  pellentesque adipiscing commodo elit at imperdiet dui.
                </p>
                <p>
                  Quis varius quam quisque id. Facilisis gravida neque convallis
                  a cras semper auctor neque vitae. Proin sagittis nisl rhoncus
                  mattis rhoncus urna neque viverra. Dolor magna eget est lorem
                  ipsum. Integer quis auctor elit sed vulputate mi sit amet
                  mauris. Egestas egestas fringilla phasellus faucibus
                  scelerisque eleifend donec pretium. Duis ut diam quam nulla.
                  Aliquet lectus proin nibh nisl condimentum id venenatis.
                  Mauris nunc congue nisi vitae suscipit.
                </p>
                <p>
                  Augue interdum velit euismod in pellentesque massa placerat
                  duis. Porttitor massa id neque aliquam vestibulum morbi
                  blandit cursus risus.
                </p>
              </div>
            </Tabs.Item>

            <Tabs.Item title="ADDITIONAL INFORMATION" className="w-full">
              <div className="xl:w-[1200px] lg:w-[900px] md:w-[600px] w-[300px]">
                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                  <tbody>
                    {/* First Row */}
                    <tr className="border-b border-gray-100  hover:bg-gray-50 700 transition-colors">
                      <td className="py-4 px-6 lg:text-lg text-base font-medium text-[#212012] dark:text-white">
                        Colors
                      </td>
                      <td className="py-4 px-6 text-base text-gray-600 dark:text-gray-500">
                        {product.colors ? product.colors.join(", ") : ""}
                      </td>
                    </tr>

                    {/* Second Row */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="py-4 px-6 lg:text-lg text-base font-medium text-[#212012] dark:text-white">
                        Material
                      </td>
                      <td className="py-4 px-6 text-base text-gray-500 ">
                        {product.material}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tabs.Item>

            <Tabs.Item title={`REVIEWS (${comments.length})`}>
              <div className="lg:w-[1000px] md:w-[800px]  w-[450px] flex flex-col lg:flex-row py-6 gap-14 lg:gap-20">
                {/* left */}
                <div className="flex flex-col gap-5 flex-1">
                  <p className="text-[#212012] font-semibold lg:text-2xl text-xl">
                    Reviews
                  </p>
                  <p className="text-gray-500 text-sm lg:text-base">
                    There are no reviews yet.
                  </p>
                  {/* reviews */}
                  {comments &&
                    comments.map((comment) => (
                      <div className="flex gap-3" key={comment._id}>
                        {/* left */}
                        <img
                          src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/user-avatar-150x150.jpg"
                          alt=""
                          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                        />
                        {/* right */}
                        <div className="flex-1 flex flex-col gap-4">
                          {/* name & rating */}
                          <div className="flex justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <p className="font-bold lg:text-base text-sm">
                                {comment.user.userName}
                              </p>
                              <p className="text-gray-500 lg:text-sm text-xs">
                                – {moment(comment.createdAt).fromNow()}
                              </p>
                            </div>
                            <Rating>
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star filled={false} />
                            </Rating>
                          </div>
                          {/* title */}
                          <div>
                            <p className="font-bold lg:text-base text-sm">
                              {comment.title}
                            </p>
                          </div>
                          {/* review */}
                          <div>
                            <p className="text-gray-700 lg:text-[15px] text-[14px]">
                              {comment.content}
                            </p>
                          </div>
                          <hr />
                          {/* likes */}
                          <div className="flex items-center gap-5">
                            <button
                              className={`text-gray-400 hover:text-blue-500 ${
                                loggedUser &&
                                comment.likes.includes(loggedUser._id)
                                  ? "!text-blue-500"
                                  : "text-gray-400"
                              }`}
                              onClick={() => {
                                handleLike(comment._id);
                              }}
                            >
                              <FaThumbsUp className="text-base" />
                            </button>
                            <p className="text-gray-400 text-sm">
                              {comment.numberOfLikes > 0 &&
                                comment.numberOfLikes +
                                  " " +
                                  (comment.numberOfLikes > 1
                                    ? "likes"
                                    : "like")}
                            </p>
                            {loggedUser &&
                              (loggedUser._id === comment.user._id ||
                                loggedUser.role === "admin") && (
                                <>
                                  <button
                                    className="text-gray-400 hover:text-red-500 text-sm"
                                    onClick={() => {
                                      setShowModal(true);
                                      setSelectedComment(comment);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/* right */}
                <div className="flex-1 flex flex-col gap-6">
                  {comments.length === 0 && (
                    <p className="text-[#212012] font-semibold lg:text-lg text-base">
                      Be the first to review “{product.title}”
                    </p>
                  )}

                  <div className="flex gap-2">
                    <p className="text-xs text-[#465550] font-semibold">
                      YOUR RATING *
                    </p>
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                  </div>
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <Label
                        className="text-[#989d91] lg:text-lg text-base"
                        htmlFor="default-search"
                      >
                        Review Title
                      </Label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleChange}
                        className="!rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label
                        className="text-[#989d91] lg:text-lg text-base"
                        htmlFor="default-search"
                      >
                        Your Review
                      </Label>

                      <textarea
                        className="w-full  border-[3px] border-gray-100 rounded-2xl p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200 resize-none"
                        rows={4}
                        id="content"
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      className="bg-[#264c4f] text-white lg:px-10 px-8 py-3 rounded-full w-fit text-base font-semibold"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                  {error && (
                    <Alert className="text-sm text-white font-semibold bg-[#e44b5f]">
                      {error}
                    </Alert>
                  )}
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3>Are you sure you want to delete this comment?</h3>
            <div className="mt-4 flex justify-center gap-6">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                {"No, Cancel"}{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
