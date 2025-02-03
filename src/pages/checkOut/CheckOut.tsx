// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import Navbar from "../../globals/components/navbar/Navbar";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { IData, PaymentMethod } from "./types";
// import { orderItem } from "../../store/checkoutSlice";



// const CheckOut = () => {
//   const dispatch = useAppDispatch();
//   const { items } = useAppSelector((store) => store.cart);
//   const { khaltiUrl, status } = useAppSelector((store) => store.checkout);

//   const [formData, setFormData] = useState<IData>({
//     name: "",
//     address: "",
//     paymentMethod: PaymentMethod.CashOnDelivery,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     dispatch(orderItem(formData));
//   };

//   useEffect(() => {
//     if (status === "success") {
//       // Redirect to success page or show success message
//     }
//   }, [status]);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
//           Checkout
//         </h1>
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
//               Payment Method
//             </label>
//             <select
//               id="paymentMethod"
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             >
//               <option value={PaymentMethod.CashOnDelivery}>Cash on Delivery</option>
//               <option value={PaymentMethod.Khalti}>Khalti</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
//           >
//             Place Order
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CheckOut;

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IData, PaymentMethod } from "./types";
import { orderItem } from "../../store/checkoutSlice";

const CheckOut = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const { khaltiUrl, status } = useAppSelector((store) => store.checkout);

  const [formData, setFormData] = useState<IData>({
    name: "",
    address: "",
    paymentMethod: PaymentMethod.CashOnDelivery,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(orderItem(formData));
  };

  useEffect(() => {
    if (status === "success") {
      // Redirect to success page or show success message
    }
  }, [status]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value={PaymentMethod.CashOnDelivery}>Cash on Delivery</option>
              <option value={PaymentMethod.Khalti}>Khalti</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckOut;