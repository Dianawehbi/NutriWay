import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import img from '../../assets/bfit.jpg'
import logo from '../../assets/logo.png'

const cartItems = [
  {
    name: "3in1 Micellar Cleansing Water - Sample Free",
    price: 0,
    quantity: 1,
    image: "image-url",
  },
  {
    name: "3in1 Micellar Cleansing Water - Sample Free",
  }, {},
];

export default function Bag() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex font-serif flex-col bg-gray-100 h-screen">
      {/* Bar */}
      <div className="fixed bg-white top-0 rounded-b-2xl font-serif  right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Shop'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Cart</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-row justify-between">
        <div className="mt-25 mx-5 max-w-3xl xl:max-w-300 xl:min-w-300 bg-white shadow-md border-1 border-gray-200 rounded-2xl  mb-40">
          {cartItems.map((item, index) => (
            <div className="flex items-center  justify-between p-4 border-b-1 border-gray-300">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <img src={img} alt="" className="w-20 h-20 mr-2 rounded-lg" />
                </div>
                <div className="flex flex-col font-medium top-0">
                  <span>whitening Roll -On Deodorant - Beauty Pearl 1+1 Free
                  </span>
                  <span>1x Usd 3</span>
                </div>
              </div>
              <div className="flex items-center md:max-w-300  justify-between border-gray-400 border rounded-xl m-2 p-2 w-30">
                <button className="px-2"> <FaRegTrashCan /></button>
                <span className="px-2">1</span>
                <button className="px-2"><FiPlus /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden xl:flex h-70 mt-25 mr-25">
          <img src={logo} alt="" className="roun" />
        </div>
      </div>


      {/* checkout */}
      <div className="fixed bottom-0 left-0   right-0 p-6 bg-white border-gray-300 border-2">
        <Link to={'/CheckoutPage'}>
          <div className=" bg-[#00bd1f] p-5 flex justify-between items-center text-black rounded-2xl">
            <span className=" font-bold">{cartItems.length} Items</span>
            <button className="">Checkout</button>
            <span className=" font-bold">USD {total.toLocaleString()}</span>
          </div>
        </Link>
      </div>

    </div >
  );
};

