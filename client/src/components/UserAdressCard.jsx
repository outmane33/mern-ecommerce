import { Alert, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  addressStart,
  addressSuccess,
  addressFailure,
  selectAddress,
} from "../redux/actions/adressActions";
import { useDispatch, useSelector } from "react-redux";
import { LuTrash } from "react-icons/lu";
import { useLocation } from "react-router-dom";

export default function UserAdressCard() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const allAdresses = useSelector((state) => state.address.addresses);
  const loading = useSelector((state) => state.address.loading);
  const error = useSelector((state) => state.address.error);
  const selectedAdress = useSelector((state) => state.address.selectedAdress);
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getAllAdresses = async () => {
      try {
        dispatch(addressStart());
        const res = await fetch("/api/v1/adresses", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "success") {
          dispatch(addressSuccess(data.adresses));
        } else {
          dispatch(addressFailure(data.errors[0].msg));
        }
      } catch (error) {
        dispatch(addressFailure(error.message));
      }
    };

    getAllAdresses();
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.details ||
      !formData.phone ||
      !formData.city ||
      !formData.postalCode
    ) {
      dispatch(addressFailure("All fields are required"));
      return;
    }
    if (allAdresses.length >= 3) {
      dispatch(addressFailure("You can't add more than 3 adresses"));
      return;
    }
    try {
      dispatch(addressStart());
      const res = await fetch("/api/v1/adresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(addressSuccess(data.adresses));
        setSuccess(true);
      } else {
        dispatch(addressFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(addressFailure(error.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/v1/adresses/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch(addressSuccess(data.adresses));
      } else {
        dispatch(addressFailure(data.errors[0].msg));
      }
    } catch (error) {
      dispatch(addressFailure(error.message));
    }
  };

  const handleSelectAdress = (address) => {
    dispatch(selectAddress(address));
    setFormData(address);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* adresses */}
      <div className="flex flex-wrap  gap-4">
        {/* adresse container */}
        {allAdresses.map((address) => (
          <div
            className={`flex flex-col gap-2 border max-w-md w-full py-4 px-7 rounded-lg cursor-pointer hover:shadow-md ${
              selectedAdress
                ? address._id === selectedAdress._id
                  ? "border border-black"
                  : ""
                : ""
            }`}
            key={address._id}
            onClick={() => {
              handleSelectAdress(address);
            }}
          >
            <div className="flex gap-2">
              <p className="font-semibold">Adress:</p>
              <p>{address.details}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Phone:</p>
              <p>{address.phone}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">City:</p>
              <p>{address.city}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">PostalCode:</p>
              <p>{address.postalCode}</p>
            </div>
            <div className="w-full flex justify-end ">
              <LuTrash
                className="text-xl cursor-pointer hover:text-red-500"
                onClick={() => {
                  handleDelete(address._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {allAdresses.length < 3 && (
        <>
          <h2 className="text-2xl font-semibold">Add New Adresse</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label>Adress</Label>
              <TextInput
                placeholder="Enter your adress"
                id="details"
                onChange={handleChange}
                value={formData.details}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <TextInput
                placeholder="Enter your phone"
                id="phone"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <div>
              <Label>City</Label>
              <TextInput
                placeholder="Enter your city"
                id="city"
                onChange={handleChange}
                value={formData.city}
              />
            </div>
            <div>
              <Label>PostalCode</Label>
              <TextInput
                placeholder="Enter your postalCode"
                id="postalCode"
                onChange={handleChange}
                value={formData.postalCode}
              />
            </div>
            <button className="w-full bg-black text-white px-4 py-2 border hover:bg-white hover:text-black hover:border-black">
              {loading ? <Spinner /> : "Add Adress"}
            </button>
          </form>
        </>
      )}
      {error && <Alert color="failure">{error}</Alert>}
      {success && <Alert color="success">Adress added successfully</Alert>}
    </div>
  );
}
