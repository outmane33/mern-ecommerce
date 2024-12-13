import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import UserHome from "../components/UserHome";
import UserListing from "../components/UserListing";
import UserAcount from "../components/UserAcount";
import UserCheckout from "../components/UserCheckout";
import UserWishlist from "../components/UserWishlist";
import UserFooter from "../components/UserFooter";
import UserBanner from "../components/UserBanner";
import UserContactUs from "../components/UserContactUs";
import UserAboutUs from "../components/UserAboutUs";
import UserNews from "../components/UserNews";
import UserCart from "../components/UserCart";
import UserProductCategory from "../components/UserProductCategory";
import UserProductPage from "../components/UserProductPage";

export default function UserPage() {
  const { content, category } = useParams();
  console.log(content);
  return (
    <div className="flex flex-col">
      <UserHeader />
      <UserBanner />
      <div>
        {content === undefined && <UserHome />}
        {content === "listing" && <UserListing />}
        {content === "acount" && <UserAcount />}
        {content === "checkout" && <UserCheckout />}
        {content === "wishlist" && <UserWishlist />}
        {content === "contact-us" && <UserContactUs />}
        {content === "about-us" && <UserAboutUs />}
        {content === "news" && <UserNews />}
        {content === "cart" && <UserCart />}
        {content === "product-category" && category && <UserProductCategory />}
        {content === "product" && category && <UserProductPage />}
      </div>
      <UserFooter />
    </div>
  );
}
