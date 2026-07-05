"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { clearCart } from "@/redux/reducer/CartReducer";
import { axiosApiInstance } from "@/helper/helper";
import AddressForm from "./AddressForm";
import PaymentMethod from "./PaymentMethod";

export default function CheckoutClient() {
  const dispatch = useDispatch();
  const router = useRouter();

  /* ---------------- REDUX ---------------- */
  const user = useSelector((state) => state.user?.user);
  console.log("user in checkout",user)
  const reduxCart = useSelector((state) => state.cart?.items || []);

  /* ---------------- SERVER CART (SOURCE OF TRUTH) ---------------- */
  const [serverCart, setServerCart] = useState([]);

  /* ---------------- ADDRESS ---------------- */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  /* ---------------- PAYMENT ---------------- */
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  /* ---------------- NOTIFICATION ---------------- */
  const [notification, setNotification] = useState(null);

  function notify(type, message) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }

  /* ---------------- FETCH ADDRESSES ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosApiInstance.get("/address");
        if (res.data.flag) {
          setAddresses(res.data.addresses);
        }
        
      } catch (err) {
        console.error("Fetch address error", err);
        notify("error", "Failed to load addresses");
      }
    })();
  }, []);

  /* ---------------- FETCH CART FROM BACKEND ---------------- */
  useEffect(() => {
    if (!user?._id) return;

    (async () => {
      try {
        const res = await axiosApiInstance.get(
          `/cart/${user._id}`
        );
         console.log("cart in checkout", res.data);
        if (res.data?.flag) {
          setServerCart(res.data.cart?.items || []);
        }
      } catch (err) {
        console.error("Fetch cart error", err);
        notify("error", "Failed to load cart");
      }
    })();
  }, [user]);
 console.log(serverCart)
  /* ---------------- PRICE (BACKEND VERIFIED) ---------------- */
  const { subtotal, delivery, total } = useMemo(() => {
    const subtotal = serverCart.reduce(
      (sum, item) =>
        sum + item.product_id.final_price * item.quantity,
      0
    );

    const delivery = subtotal >= 999 ? 0 : 49;

    return {
      subtotal,
      delivery,
      total: subtotal + delivery,
    };
  }, [serverCart]);

  /* ---------------- PLACE ORDER ---------------- */
  async function placeOrder() {
    console.log("PLACE ORDER CLICKED", {
  paymentMethod,
  selectedAddressId,
  userId: user?._id,
});

  if (!user?._id) {
    notify("error", "Please login to continue");
    return;
  }

  if (!serverCart.length) {
    notify("error", "Your cart is empty");
    return;
  }

  if (!selectedAddressId) {
    notify("warning", "Please select a delivery address");
    return;
  }

  try {
    setLoading(true);

    const res = await axiosApiInstance.post("/order/create", {
      addressId: selectedAddressId,
      paymentMethod,
    });

    if (!res.data?.flag) {
      notify("error", res.data?.msg || "Order failed");
      return;
    }

    if (paymentMethod === "COD") {
      dispatch(clearCart());
      router.push(`/order-success?id=${res.data.order._id}`);
      return;
    }

    const { razorpayOrderId, orderId, amount, key } = res.data;

    // ✅ Proper script load
    if (!window.Razorpay) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }

    const rzp = new window.Razorpay({
      key,
      amount,
      currency: "INR",
      name: "iShop",
      order_id: razorpayOrderId,
      handler: async (response) => {
        try {
          await axiosApiInstance.post("/order/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
             console.log("Razorpay payload:", {
  key,
  razorpayOrderId,
  orderId,
  amount,
});

          dispatch(clearCart());
          router.push(`/order-success?id=${orderId}`);
        } catch {
          notify("error", "Payment verification failed");
        }
      },
      modal: {
        ondismiss: () => notify("warning", "Payment cancelled"),
      },
      theme: { color: "#01A49E" },
    });

    // ✅ handle failure
    rzp.on("payment.failed", (response) => {
      notify("error", response.error.description || "Payment failed");
    });

    rzp.open();
  } catch (err) {
    notify("error", err.response?.data?.msg || "Order failed");
  } finally {
    setLoading(false);
  }
}

  /* ---------------- RENDER ---------------- */
  return (
    <section className="bg-gray-50">
      {/* NOTIFICATION */}
      {notification && (
        <div
          className={`
            fixed top-4 left-1/2 z-[9999] -translate-x-1/2
            rounded-lg px-4 py-2 text-sm font-medium shadow-md
            ${
              notification.type === "error"
                ? "bg-red-600 text-white"
                : notification.type === "warning"
                ? "bg-yellow-500 text-black"
                : "bg-emerald-600 text-white"
            }
          `}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="bg-white border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Delivery Address
                </h2>
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressForm(true);
                  }}
                  className="text-sm font-medium text-[#01A49E]"
                >
                  + Add New
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((address) => {
                  const selected =
                    selectedAddressId === address._id;

                  return (
                    <label
                      key={address._id}
                      className={`
                        flex gap-3 cursor-pointer rounded-lg border p-4
                        ${
                          selected
                            ? "border-[#01A49E] bg-[#01A49E]/5"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        checked={selected}
                        onChange={() =>
                          setSelectedAddressId(address._id)
                        }
                      />
                      <span className="text-sm text-gray-700">
                        {address.addressLine1},{" "}
                        {address.city} –{" "}
                        {address.postalCode}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ADDRESS FORM */}
            {showAddressForm && (
              <AddressForm
                initialData={editingAddress}
                onClose={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
                onSubmit={async (address) => {
                  if (editingAddress) {
                    await axiosApiInstance.put(
                      `/address/${editingAddress._id}`,
                      { address }
                    );
                  } else {
                    await axiosApiInstance.post("/address", {
                      address,
                    });
                  }

                  const updated =
                    await axiosApiInstance.get("/address");
                  setAddresses(updated.data.addresses);
                  setShowAddressForm(false);
                  notify("success", "Address saved");
                }}
              />
            )}

            {/* PAYMENT */}
            <PaymentMethod
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="h-fit">
            <div className="bg-white border rounded-xl p-5 space-y-3">
              <h3 className="text-lg font-semibold">
                Order Summary
              </h3>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span>
                  {delivery === 0 ? "Free" : `₹${delivery}`}
                </span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                disabled={loading}
                onClick={placeOrder}
                className="
                  w-full mt-4 py-3 rounded-lg
                  bg-[#01A49E] text-white
                  font-medium
                  hover:opacity-90
                  disabled:opacity-50
                "
              >
                {loading ? "Processing…" : "Place Order"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
