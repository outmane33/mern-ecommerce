import { Breadcrumb, Dropdown, TextInput, Drawer } from "flowbite-react";
import { LuArrowUpDown } from "react-icons/lu";
import { useEffect, useState } from "react";
import UserProductCard from "./UserProductCard";
import {
  productStart,
  productSuccess,
  productFailure,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { TbColorFilter } from "react-icons/tb";

export default function UserListing() {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.product.products);

  const [formQuery, setFormQuery] = useState({
    sort: "",
    category: "",
    material: "",
    colors: "", // Added colors to formQuery
  });
  const [keyword, setKeyword] = useState("");
  const [checkedCategory, setCheckedCategory] = useState({});
  const [checkedBrands, setCheckedBrands] = useState({});
  const [selectedColors, setSelectedColors] = useState({}); // Added state for selected colors
  const [numOfPages, setNumOfPages] = useState(1);
  const [result, setResult] = useState(0);
  const [count, setCount] = useState(0);
  const [colorCounts, setColorcolorCounts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

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
        setResult(data.results);
        setNumOfPages(data.paginationResult.pages);
        setCount(data.totalCount);
        setColorcolorCounts(data.colorCounts);
      } else {
        dispatch(productFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(productFailure(error));
    }
  };
  useEffect(() => {
    getAllProducts(`/api/v1/product`);
  }, [location.pathname]);

  // Utility function to build the query string
  const buildQueryString = (params) => {
    const { sort, colors, category, material, keyword } = params;
    const queryParts = [];

    if (sort) queryParts.push(`sort=${sort}`);
    if (category) queryParts.push(`category[in]=${category}`);
    if (material) queryParts.push(`material[in]=${material}`);
    if (colors) queryParts.push(`colors[in]=${colors}`);
    if (keyword) queryParts.push(`keyword=${keyword}`);

    return `/api/v1/product${
      queryParts.length ? "?" + queryParts.join("&") : ""
    }`;
  };

  // Utility function to update checked items and generate comma-separated string
  const handleCheckboxChange = (prevState, name, checked) => {
    const updatedState = { ...prevState, [name]: checked };
    return {
      updatedState,
      commaSeparatedValues: Object.keys(updatedState)
        .filter((key) => updatedState[key])
        .join(","),
    };
  };

  // Update all states and trigger API call
  const updateFiltersAndFetch = (newFormQuery) => {
    setFormQuery(newFormQuery);
    const queryString = buildQueryString({
      ...newFormQuery,
      keyword,
    });
    getAllProducts(queryString);
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    const { updatedState, commaSeparatedValues } = handleCheckboxChange(
      checkedCategory,
      name,
      checked
    );

    setCheckedCategory(updatedState);
    updateFiltersAndFetch({
      ...formQuery,
      category: commaSeparatedValues,
    });
  };

  const handleBrandChange = (e) => {
    const { name, checked } = e.target;
    const { updatedState, commaSeparatedValues } = handleCheckboxChange(
      checkedBrands,
      name,
      checked
    );

    setCheckedBrands(updatedState);
    updateFiltersAndFetch({
      ...formQuery,
      material: commaSeparatedValues,
    });
  };

  const handleColorChange = (color) => {
    const updatedColors = { ...selectedColors };
    updatedColors[color] = !updatedColors[color]; // Toggle color selection
    setSelectedColors(updatedColors);

    // Create comma-separated string of selected colors
    const selectedColorsList = Object.keys(updatedColors)
      .filter((key) => updatedColors[key])
      .join(",");

    updateFiltersAndFetch({
      ...formQuery,
      colors: selectedColorsList,
    });
  };

  const handleSortChange = (value) => {
    updateFiltersAndFetch({
      ...formQuery,
      sort: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = buildQueryString({
      ...formQuery,
      keyword,
    });
    getAllProducts(queryString);
  };

  return (
    <>
      {/* banner  section */}
      <div className="flex justify-center items-center relative mx-5 md:mx-7 lg:mx-9 xl:mx-12">
        <div className="max-w-[1700px] w-full my-16 relative  h-[300px] lg:h-[400px]">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>

          {/* Image */}
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/shop-hero-image.webp"
            alt=""
            className="rounded-3xl  h-[300px] lg:h-[400px] w-full object-cover"
          />

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-3xl font-bold">
            <p className="pb-6">Shop</p>
            <Breadcrumb
              aria-label="Default breadcrumb example"
              className="text-white"
            >
              <Breadcrumb.Item href="#">
                <p className="text-white">Home</p>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#" className="text-white">
                <p className="text-white">Projects</p>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      {/* brands */}
      <div className="md:grid-cols-3 md:gap-4 lg:grid-cols-6  py-10 md:max-w-2xl lg:max-w-7xl mx-auto hidden md:grid lg:px-10">
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/armchairs-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px]  font-semibold ">
              Armchairs
            </p>
            <p className="text-gray-500 text-base lg:text-base  whitespace-nowrap">
              5 products
            </p>
          </div>
        </div>
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/chairs-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px] font-semibold ">Chairs</p>
            <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
              6 products
            </p>
          </div>
        </div>
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/storage-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px] font-semibold ">Storage</p>
            <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
              6 products
            </p>
          </div>
        </div>
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/sofas-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px] font-semibold ">Sofas</p>
            <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
              5 products
            </p>
          </div>
        </div>
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/decor-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px] font-semibold ">Decor</p>
            <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
              8 products
            </p>
          </div>
        </div>
        {/* brand */}
        <div className="flex gap-3">
          <img
            src="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/05/tables-category-hero-image.webp"
            alt=""
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <p className="lg:text-[19px] text-[16px] font-semibold ">Tables</p>
            <p className="text-gray-500 text-base lg:text-lg whitespace-nowrap">
              5 products
            </p>
          </div>
        </div>
      </div>

      {/* main section */}
      <div className="min-h-screen flex py-10 max-w-7xl mx-auto">
        {/* filter sidebar */}
        <div className="w-[300px] p-10  flex-col gap-3 hidden lg:flex">
          <form onSubmit={handleSubmit}>
            <TextInput
              id="keyword"
              rightIcon={IoSearch}
              className="mb-7 text-3xl"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          {/* filter */}
          <div className="mb-2">
            <p className="text-xl font-semibold text-[#212b28] ">
              Filter by category
            </p>
          </div>
          {/* filter by category */}
          <div className="flex flex-col gap-2 pb-6">
            <div>
              <input
                id="checkbox-Armchairs"
                type="checkbox"
                name="Armchairs"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Armchairs}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Armchairs">
                Armchairs
              </label>
            </div>

            <div>
              <input
                id="checkbox-Beds"
                type="checkbox"
                name="Beds"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Beds}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Beds">
                Beds
              </label>
            </div>

            <div>
              <input
                id="checkbox-Chairs"
                type="checkbox"
                name="Chairs"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Chairs}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Chairs">
                Chairs
              </label>
            </div>

            <div>
              <input
                id="checkbox-Decor"
                type="checkbox"
                name="Decor"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Decor}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Decor">
                Decor
              </label>
            </div>

            <div>
              <input
                id="checkbox-Sofas"
                type="checkbox"
                name="Sofas"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Sofas}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Sofas">
                Sofas
              </label>
            </div>
            <div>
              <input
                id="checkbox-Storage"
                type="checkbox"
                name="Storage"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Storage}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Storage">
                Storage
              </label>
            </div>
            <div>
              <input
                id="checkbox-Tables"
                type="checkbox"
                name="Tables"
                className="rounded mr-2 border-[#bfc5c3]"
                checked={checkedCategory.Tables}
                onChange={handleCategoryChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Tables">
                Tables
              </label>
            </div>
          </div>

          {/* filter by color */}
          <div className="">
            <p className="text-xl font-semibold text-[#212b28] ">
              Filter by color
            </p>
          </div>
          {/* colors */}
          <div className="w-full flex flex-col gap-2">
            {/* Beige */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Beige ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Beige")}
            >
              <div className="w-4 h-4 rounded-full bg-[#D2B48C] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#D2B48C] transition-all duration-200"></div>
              <span className="text-gray-700">Beige</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Beige
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Beige}
              </span>
            </div>
            {/* Black */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Black ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Black")}
            >
              <div className="w-4 h-4 rounded-full bg-black outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-black transition-all duration-200"></div>
              <span className="text-gray-700">Black</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Black
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Black}
              </span>
            </div>
            {/* Blue */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Blue ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Blue")}
            >
              <div className="w-4 h-4 rounded-full bg-[#0790ba] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#0790ba] transition-all duration-200"></div>
              <span className="text-gray-700">Blue</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Blue
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Blue}
              </span>
            </div>
            {/* Brown */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Brown ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Brown")}
            >
              <div className="w-4 h-4 rounded-full bg-[#662f00] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#662f00] transition-all duration-200"></div>
              <span className="text-gray-700">Brown</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Brown
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Brown}
              </span>
            </div>
            {/* Gray */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Gray ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Gray")}
            >
              <div className="w-4 h-4 rounded-full bg-[#c8c9c9] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#c8c9c9] transition-all duration-200"></div>
              <span className="text-gray-700">Gray</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Gray
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Gray}
              </span>
            </div>
            {/* Green */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Green ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Green")}
            >
              <div className="w-4 h-4 rounded-full bg-[#6fa802] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#6fa802] transition-all duration-200"></div>
              <span className="text-gray-700">Green</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Green
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Green}
              </span>
            </div>
            {/* Orange */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Orange ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Orange")}
            >
              <div className="w-4 h-4 rounded-full bg-[#ff8412] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#ff8412] transition-all duration-200"></div>
              <span className="text-gray-700">Orange</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Orange
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Orange}
              </span>
            </div>

            {/* White */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.White ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("White")}
            >
              <div className="w-4 h-4 rounded-full bg-[#f4f4f4] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#f4f4f4] transition-all duration-200"></div>
              <span className="text-gray-700">White</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.White
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.White}
              </span>
            </div>

            {/* Yellow */}
            <div
              className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                selectedColors.Yellow ? "bg-gray-100" : ""
              }`}
              onClick={() => handleColorChange("Yellow")}
            >
              <div className="w-4 h-4 rounded-full bg-[#f9cd0c] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#f9cd0c] transition-all duration-200"></div>
              <span className="text-gray-700">Yellow</span>
              <span
                className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                  selectedColors.Yellow
                    ? "bg-[#446a6d] text-white border-[#446a6d]"
                    : ""
                }`}
              >
                {colorCounts.Yellow}
              </span>
            </div>
          </div>

          {/* filter by material */}
          <div className="flex flex-col gap-2 mt-5">
            <p className="text-xl font-semibold text-[#212b28] mb-2">
              Filter by material
            </p>

            <div>
              <input
                id="checkbox-Aluminium"
                type="checkbox"
                name="Aluminium"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Aluminium}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Aluminium">
                Aluminium
              </label>
            </div>

            <div>
              <input
                id="checkbox-Fabric"
                type="checkbox"
                name="Fabric"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Fabric}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Fabric">
                Fabric
              </label>
            </div>

            <div>
              <input
                id="checkbox-Glass"
                type="checkbox"
                name="Glass"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Glass}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Glass">
                Glass
              </label>
            </div>

            <div>
              <input
                id="checkbox-Leather"
                type="checkbox"
                name="Leather"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Leather}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Leather">
                Leather
              </label>
            </div>

            <div>
              <input
                id="checkbox-Marble"
                type="checkbox"
                name="Marble"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Marble}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Marble">
                Marble
              </label>
            </div>

            <div>
              <input
                id="checkbox-Metal"
                type="checkbox"
                name="Metal"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Metal}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Metal">
                Metal
              </label>
            </div>
            <div>
              <input
                id="checkbox-Plastic"
                type="checkbox"
                name="Plastic"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Plastic}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Plastic">
                Plastic
              </label>
            </div>
            <div>
              <input
                id="checkbox-Wood"
                type="checkbox"
                name="Wood"
                className="rounded mr-1 border-[#bfc5c3]"
                checked={checkedBrands.Wood}
                onChange={handleBrandChange}
              />
              <label className="text-gray-700" htmlFor="checkbox-Wood">
                Wood
              </label>
            </div>
          </div>
          {/* best selling products */}
          <div className="flex flex-col gap-2 mt-5 ">
            <p className="text-xl font-semibold text-[#212b28] mb-3">
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
        {/* all products */}
        <div className="w-full flex flex-col  flex-1 ">
          <div className="flex justify-between items-center px-5 pt-8 pb-2 border-b">
            <p className="text-sm flex items-center gap-2">
              <button
                className="border rounded-2 flex items-center gap-2 px-4 py-1 hover:bg-[#274b4f] hover:text-white transition-all duration-300 lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <TbColorFilter /> FILTER
              </button>
              SHOWING 1–
              {numOfPages} OF {count} RESULTS
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-fit border flex items-center gap-1 px-2 py-1">
                <LuArrowUpDown />
                <Dropdown
                  label="Sort by"
                  arrowIcon={false}
                  inline
                  onChange={handleSortChange}
                  id="sort"
                >
                  <Dropdown.Item onClick={() => handleSortChange("price")}>
                    Price Low to High
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("-price")}>
                    Price High to Low
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("title")}>
                    Title A to Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("-title")}>
                    Price Z to A
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="p-5 flex flex-wrap gap-5 justify-center">
            {/*product card  */}
            {products &&
              products.map((product) => (
                <UserProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-[440px]"
      >
        <Drawer.Header title="Available Filters" titleIcon={() => <></>} />
        <Drawer.Items>
          {/* filter sidebar */}
          <div className="flex-col gap-3 pt-5 px-2">
            <form onSubmit={handleSubmit}>
              <TextInput
                id="keyword"
                rightIcon={IoSearch}
                className="mb-7 text-3xl"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
            {/* filter */}
            <div className="mb-2">
              <p className="text-xl font-semibold text-[#212b28] ">
                Filter by category
              </p>
            </div>
            {/* filter by category */}
            <div className="flex flex-col gap-2 pb-6">
              <div>
                <input
                  id="checkbox-Armchairs"
                  type="checkbox"
                  name="Armchairs"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Armchairs}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Armchairs">
                  Armchairs
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Beds"
                  type="checkbox"
                  name="Beds"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Beds}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Beds">
                  Beds
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Chairs"
                  type="checkbox"
                  name="Chairs"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Chairs}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Chairs">
                  Chairs
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Decor"
                  type="checkbox"
                  name="Decor"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Decor}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Decor">
                  Decor
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Sofas"
                  type="checkbox"
                  name="Sofas"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Sofas}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Sofas">
                  Sofas
                </label>
              </div>
              <div>
                <input
                  id="checkbox-Storage"
                  type="checkbox"
                  name="Storage"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Storage}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Storage">
                  Storage
                </label>
              </div>
              <div>
                <input
                  id="checkbox-Tables"
                  type="checkbox"
                  name="Tables"
                  className="rounded mr-2 border-[#bfc5c3]"
                  checked={checkedCategory.Tables}
                  onChange={handleCategoryChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Tables">
                  Tables
                </label>
              </div>
            </div>

            {/* filter by color */}
            <div className="">
              <p className="text-xl font-semibold text-[#212b28] ">
                Filter by color
              </p>
            </div>
            {/* colors */}
            <div className="w-full flex flex-col gap-2">
              {/* Beige */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Beige ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Beige")}
              >
                <div className="w-4 h-4 rounded-full bg-[#D2B48C] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#D2B48C] transition-all duration-200"></div>
                <span className="text-gray-700">Beige</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Beige
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Beige}
                </span>
              </div>
              {/* Black */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Black ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Black")}
              >
                <div className="w-4 h-4 rounded-full bg-black outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-black transition-all duration-200"></div>
                <span className="text-gray-700">Black</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Black
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Black}
                </span>
              </div>
              {/* Blue */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Blue ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Blue")}
              >
                <div className="w-4 h-4 rounded-full bg-[#0790ba] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#0790ba] transition-all duration-200"></div>
                <span className="text-gray-700">Blue</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Blue
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Blue}
                </span>
              </div>
              {/* Brown */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Brown ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Brown")}
              >
                <div className="w-4 h-4 rounded-full bg-[#662f00] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#662f00] transition-all duration-200"></div>
                <span className="text-gray-700">Brown</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Brown
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Brown}
                </span>
              </div>
              {/* Gray */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Gray ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Gray")}
              >
                <div className="w-4 h-4 rounded-full bg-[#c8c9c9] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#c8c9c9] transition-all duration-200"></div>
                <span className="text-gray-700">Gray</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Gray
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Gray}
                </span>
              </div>
              {/* Green */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Green ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Green")}
              >
                <div className="w-4 h-4 rounded-full bg-[#6fa802] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#6fa802] transition-all duration-200"></div>
                <span className="text-gray-700">Green</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Green
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Green}
                </span>
              </div>
              {/* Orange */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Orange ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Orange")}
              >
                <div className="w-4 h-4 rounded-full bg-[#ff8412] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#ff8412] transition-all duration-200"></div>
                <span className="text-gray-700">Orange</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Orange
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Orange}
                </span>
              </div>

              {/* White */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.White ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("White")}
              >
                <div className="w-4 h-4 rounded-full bg-[#f4f4f4] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#f4f4f4] transition-all duration-200"></div>
                <span className="text-gray-700">White</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.White
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.White}
                </span>
              </div>

              {/* Yellow */}
              <div
                className={`flex items-center justify-between gap-2 rounded p-1 cursor-pointer group w-full ${
                  selectedColors.Yellow ? "bg-gray-100" : ""
                }`}
                onClick={() => handleColorChange("Yellow")}
              >
                <div className="w-4 h-4 rounded-full bg-[#f9cd0c] outline-offset-2 group-hover:outline group-hover:outline-4 p-1 group-hover:outline-[#f9cd0c] transition-all duration-200"></div>
                <span className="text-gray-700">Yellow</span>
                <span
                  className={`text-gray-500 border px-2 rounded-full ml-auto transition-all duration-200 ${
                    selectedColors.Yellow
                      ? "bg-[#446a6d] text-white border-[#446a6d]"
                      : ""
                  }`}
                >
                  {colorCounts.Yellow}
                </span>
              </div>
            </div>

            {/* filter by material */}
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-xl font-semibold text-[#212b28] mb-2">
                Filter by material
              </p>

              <div>
                <input
                  id="checkbox-Aluminium"
                  type="checkbox"
                  name="Aluminium"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Aluminium}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Aluminium">
                  Aluminium
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Fabric"
                  type="checkbox"
                  name="Fabric"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Fabric}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Fabric">
                  Fabric
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Glass"
                  type="checkbox"
                  name="Glass"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Glass}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Glass">
                  Glass
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Leather"
                  type="checkbox"
                  name="Leather"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Leather}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Leather">
                  Leather
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Marble"
                  type="checkbox"
                  name="Marble"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Marble}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Marble">
                  Marble
                </label>
              </div>

              <div>
                <input
                  id="checkbox-Metal"
                  type="checkbox"
                  name="Metal"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Metal}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Metal">
                  Metal
                </label>
              </div>
              <div>
                <input
                  id="checkbox-Plastic"
                  type="checkbox"
                  name="Plastic"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Plastic}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Plastic">
                  Plastic
                </label>
              </div>
              <div>
                <input
                  id="checkbox-Wood"
                  type="checkbox"
                  name="Wood"
                  className="rounded mr-1 border-[#bfc5c3]"
                  checked={checkedBrands.Wood}
                  onChange={handleBrandChange}
                />
                <label className="text-gray-700" htmlFor="checkbox-Wood">
                  Wood
                </label>
              </div>
            </div>
            {/* best selling products */}
            <div className="flex flex-col gap-2 mt-5 ">
              <p className="text-base font-semibold text-[#212b28] mb-3">
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
                    <p className="font-semibold text-base">Aliquam Blandit</p>
                    <p className="text-sm">$320.00</p>
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
                    <p className="font-semibold text-base">Porta Non</p>
                    <p className="text-sm">$320.00</p>
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
                    <p className="font-semibold text-base">Diam Volutpat</p>
                    <p className="text-sm">$320.00</p>
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
                    <p className="font-semibold text-base">Porttitor Massa</p>
                    <p className="text-sm">$320.00</p>
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
                    <p className="font-semibold text-base">Senectus Netus</p>
                    <p className="text-sm">$320.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
