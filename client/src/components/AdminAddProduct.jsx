import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Alert, FileInput, Label, Select } from "flowbite-react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminAddProduct() {
  const ref = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [productImages, setProductImages] = useState([]);

  //input file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //file must be an image
    if (!file.type.includes("image")) {
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploadError("Please select an image file ");
      return;
    }
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  async function uploadImageToCloudinary() {
    if (productImages.length <= 4) {
      const data = new FormData();
      data.append("file", imageFile); // imageFile should be the file object you want to upload

      const response = await fetch("/api/v1/product/upload-image", {
        method: "POST",
        body: data, // Don't stringify FormData
      });

      const res = await response.json();

      if (res.success) {
        setImageFileUrl(res.result.url); //put the url of the uploaded image in imageFileUrl
        setProductImages([...productImages, res.result.url]);
      } else {
        console.error("Upload failed:", res.message);
      }
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    // if (
    //   !formData.brand ||
    //   !formData.category ||
    //   !formData.description ||
    //   !formData.material ||
    //   !formData.price ||
    //   !formData.priceAfterDiscount ||
    //   !formData.quantity ||
    //   !productImages.title
    // ) {
    //   setError("All fields are required");
    //   return;
    // }

    if (productImages.length === 0) {
      setError("Please add at least one image");
      return;
    }
    //get the last image from productImages and remove it from the array
    formData.imageCover = productImages[productImages.length - 1];
    //remove the last image from the array
    setFormData({ ...formData, images: productImages.slice(0, -1) });
    try {
      setLoading(true);
      const res = await fetch("/api/v1/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        setSuccess(true);
        setLoading(false);
        setProductImages([]);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadError(null);
        setFormData({});
        setError(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-10 pt-5">
        <p className="text-2xl font-bold">Add Product</p>
      </div>
      <div className="flex gap-10 p-10">
        {/* left */}
        <div className="flex-1 bg-white  rounded-3xl p-6">
          <form className="flex flex-col gap-5">
            {/* title */}
            <div className="flex gap-5 w-full ">
              <div className="flex flex-col flex-1">
                <Label
                  htmlFor="default-search"
                  className="text-[#989d91] text-lg"
                >
                  Product Title
                </Label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="rounded-full border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex gap-3">
              {/* category */}
              <div className="flex flex-1 flex-col">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Category
                </Label>
                <Select
                  id="keyword"
                  name="category"
                  onChange={handleChange}
                  className="rounded-full border-[3px] border-gray-100 w-full  focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                >
                  <option value="Armchairs">Armchairs</option>
                  <option value="Beds">Beds</option>
                  <option value="Chairs">Chairs</option>
                  <option value="Decor">Decor</option>
                  <option value="Sofas">Sofas</option>
                  <option value="Storage">Storage</option>
                  <option value="Tables">Tables</option>
                </Select>
              </div>
              {/* barnd */}
              <div className="flex flex-1 flex-col">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Brand
                </Label>
                <Select
                  id="keyword"
                  name="brand"
                  onChange={handleChange}
                  className="rounded-full border-[3px] border-gray-100 w-full  focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                >
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-goldline.svg">
                    Goldine
                  </option>
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-magnolia.svg">
                    Magnolia
                  </option>
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-boltshift.svg">
                    Bolshift
                  </option>
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-contrast.svg">
                    Contrast
                  </option>
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-asgardia.svg">
                    Asgardia
                  </option>
                  <option value="https://startersites.io/blocksy/furniture/wp-content/uploads/2024/06/brand-komplex.svg">
                    Komplex
                  </option>
                </Select>
              </div>
            </div>
            {/* price */}
            <div className="flex gap-3">
              {/* Price */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Price
                </Label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
              {/* Price after discount */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Price after discount
                </Label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="priceAfterDiscount"
                  className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
              {/* Total in stock */}
              <div className="flex flex-col flex-1">
                <Label
                  className="text-[#989d91] text-lg"
                  htmlFor="default-search"
                >
                  Total in stock
                </Label>
                <input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
                />
              </div>
            </div>
            {/* Material */}
            <div className="flex flex-col">
              <Label
                className="text-[#989d91] text-lg"
                htmlFor="default-search"
              >
                Material
              </Label>
              <input
                type="text"
                name="material"
                onChange={handleChange}
                className="rounded-full  border-[3px] border-gray-100 w-full p-3 focus:outline-none focus:ring-0 focus:border-[#264c4f] focus:border-[3px] transition-colors duration-200"
              />
            </div>
          </form>
        </div>
        {/* right */}
        <div className="flex-1 bg-white  rounded-3xl p-6">
          {/* upload images */}
          <div className="flex  gap-3">
            {/* images */}
            <div className="flex flex-col gap-5">
              {/* image 1 */}
              <div className="w-[150px] h-[150px] border relative">
                <img
                  src={
                    productImages[0] ||
                    "https://remosnextjs.vercel.app/images/upload/upload-1.png"
                  }
                  alt=""
                  className="w-full h-full"
                />
                <IoClose
                  className="absolute top-2 left-2 text-xl cursor-pointer"
                  onClick={() => {
                    const newProductImages = productImages.filter(
                      (image, index) => index !== 0
                    );
                    setProductImages(newProductImages);
                  }}
                />
              </div>
              {/* image 2 */}
              <div className="w-[150px] h-[150px] border relative">
                <img
                  src={
                    productImages[1] ||
                    "https://remosnextjs.vercel.app/images/upload/upload-1.png"
                  }
                  alt=""
                  className="w-full h-full"
                />
                <IoClose
                  className="absolute top-2 left-2 text-xl cursor-pointer"
                  onClick={() => {
                    const newProductImages = productImages.filter(
                      (image, index) => index !== 1
                    );
                    setProductImages(newProductImages);
                  }}
                />
              </div>
              {/* image 3 */}
              <div className="w-[150px] h-[150px] border relative">
                <img
                  src={
                    productImages[2] ||
                    "https://remosnextjs.vercel.app/images/upload/upload-1.png"
                  }
                  alt=""
                  className="w-full h-full"
                />
                <IoClose
                  className="absolute top-2 left-2 text-xl cursor-pointer"
                  onClick={() => {
                    const newProductImages = productImages.filter(
                      (image, index) => index !== 2
                    );
                    setProductImages(newProductImages);
                  }}
                />
              </div>
            </div>
            {/* upload image */}
            <div>
              <FileInput
                label="Product Image"
                onChange={handleImageChange}
                className="hidden"
                ref={ref}
              />
              {productImages.length >= 4 ? (
                <div className="w-[500px] h-[500px] border  p-3 rounded-lg cursor-pointer">
                  <img
                    src={productImages[3]}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="w-[500px] h-[500px] border flex flex-col justify-center items-center gap-4 p-3 rounded-lg cursor-pointer"
                  onClick={() => ref.current.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <AiOutlineCloudUpload className="text-6xl text-[#264c4f]" />
                  <p className="text-[#264c4f] text-sm text-center">
                    Drag & Drop or click to upload image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="gap-10 bg-white px-10 pt-5 mx-10 rounded-xl">
        <div className="flex flex-col gap-7">
          <Label className="text-[#989d91] text-lg" htmlFor="default-search">
            Description
          </Label>

          <ReactQuill
            theme="snow"
            className="h-72 mb-12"
            name="description"
            onChange={(value) => {
              setFormData({
                ...formData,
                description: value,
              });
            }}
          />

          <button
            className="bg-[#264c4f] text-white px-10 py-3 rounded-full w-fit text-lg"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
        {error && <Alert color="failure">{error}</Alert>}
      </div>
    </>
  );
}
