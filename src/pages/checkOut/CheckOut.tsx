import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IData, PaymentMethod } from "./types";
import { orderItem } from "../../store/checkoutSlice";

const CheckOut = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const { khaltiUrl, status } = useAppSelector((store) => store.checkout);
  const total = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );

  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    paymentMethod: PaymentMethod.Cod,
    phoneNumber: "",
    products: [],
    state: "",
    totalAmount: 0,
    zipcode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cod
  );

  const handlePaymentMethod = (paymentData: PaymentMethod) => {
    setPaymentMethod(paymentData);
    setData((prev) => ({
      ...prev,
      paymentMethod: paymentData,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleSubmit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData =
      items.length > 0
        ? items.map((item) => ({
            productId: item.Product.id,
            productQty: item.quantity,
          }))
        : [];

    const finalData = {
      ...data,
      products: productData,
      totalAmount: total,
    };

    await dispatch(orderItem(finalData));
  };

  useEffect(() => {
    if (khaltiUrl) {
      window.location.href = khaltiUrl;
    }
  }, [khaltiUrl, status]);

  return (
    <>
      <Navbar />
      <div className="font-[sans-serif] bg-white">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="bg-gray-100 sm:h-screen sm:sticky sm:top-0 lg:min-min-w-[370px] sm:min-w-[300px]">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        className="flex items-start gap-4"
                        key={item.Product.id}
                      >
                        <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                          <img
                            src={`http://localhost:3000/${item.Product?.productImageUrl}`}
                            className="w-full object-contain"
                            alt={item.Product.productName}
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-sm lg:text-base text-gray-800">
                            {item.Product.productName}
                          </h3>
                          <ul className="text-xs text-gray-800 space-y-1 mt-3">
                            <li className="flex flex-wrap gap-4">
                              Quantity{" "}
                              <span className="ml-auto">{item.quantity}</span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Total Price{" "}
                              <span className="ml-auto">
                                Rs.{item.Product.productPrice * item.quantity}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Items</p>
                  )}
                </div>
              </div>
              <div className="md:absolute md:left-0 md:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Total <span className="ml-auto">Rs.{total}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
            <h2 className="text-2xl font-bold text-gray-800">
              Complete your order
            </h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mt-8">
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    onChange={handleChange}
                    placeholder="City"
                    className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                  />
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    placeholder="State"
                    className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md"
                  />
                  <div>
                    <label htmlFor="paymentMethod">Payment Method: </label>
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      onChange={(e) =>
                        handlePaymentMethod(e.target.value as PaymentMethod)
                      }
                    >
                      <option value={PaymentMethod.Cod}>COD</option>
                      <option value={PaymentMethod.Khalti}>Khalti</option>
                      <option value={PaymentMethod.Esewa}>Esewa</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="submit"
                    className={`rounded-md px-4 py-2.5 w-full text-sm tracking-wide text-white ${
                      paymentMethod === PaymentMethod.Cod
                        ? "bg-blue-600 hover:bg-blue-700"
                        : paymentMethod === PaymentMethod.Khalti
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {paymentMethod === PaymentMethod.Cod
                      ? "Pay on COD"
                      : paymentMethod === PaymentMethod.Khalti
                      ? "Pay with Khalti"
                      : "Pay with Esewa"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
