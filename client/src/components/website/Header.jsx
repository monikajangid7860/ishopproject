"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
  User as UserIcon,
  Heart,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import useWishlistSync from "@/hooks/useWishlistSync";
import { loadUserFromLS } from "@/redux/reducer/UserReducer";
import { loadWish } from "@/redux/reducer/WishReducer";
import { handleLogout } from "@/redux/reducer/handleLogout";
import { loadCart } from "@/redux/reducer/CartReducer";
import useCartSync from "@/hooks/userCartSync";
import { axiosApiInstance } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { getCategories } from "@/api-calls/category";
import { getBrands } from "@/api-calls/brand";




export default function Header() {
  /* ---------------- CART LOCAL STORAGE SYNC (GUEST MODE) ---------------- */
  useCartSync();
  useWishlistSync();

  /* ---------------- REDUX ---------------- */
  const cart = useSelector((state) => state.cart?.items || []);
  const wish = useSelector((state) => state.wish?.items || []);
  const user = useSelector((state) => state.user?.user || null);
  const dispatch = useDispatch();

  /* ---------------- HYDRATION ---------------- */
  const router = useRouter();

const [searchValue, setSearchValue] = useState("");
const [showSuggestions, setShowSuggestions] = useState(false);
const [categories, setCategories] = useState([]);
const [brands, setBrands] = useState([]);
const [activeIndex, setActiveIndex] = useState(-1);
const [categoryOpen, setCategoryOpen] = useState(false);





  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
useEffect(() => {
  async function fetchCategories() {
    try {
      const res = await getCategories({ status: true });
      setCategories(res?.categories || []);
      console.log("Fetched categories:", res?.categories || []);
    } catch (err) {
      console.error("Header category fetch failed", err);
    }
  }

  fetchCategories();
}, []);
useEffect(() => {
  async function fetchBrands() {
    try {
      const res = await getBrands({ status: true });
      setBrands(res?.brands || []);
    } catch (e) {
      console.error("Header brand fetch failed", e);
    }
  }

  fetchBrands();
}, []);

const normalizedCategories = categories.map((c) => ({
  name: c.name,
  slug: c.slug,
  type: "category",
}));

const normalizedBrands = brands.map((b) => ({
  name: b.name,
  slug: b.slug,
  type: "brand",
}));


const searchPool = [...normalizedCategories, ...normalizedBrands];

const filteredResults = searchPool.filter((item) =>
  item.name.toLowerCase().includes(searchValue.toLowerCase())
);
function highlightMatch(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-[#01A49E] font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

  /* ---------------- LOAD USER FROM LS ---------------- */
  useEffect(() => {
    dispatch(loadUserFromLS());
  }, [dispatch]);

  /* ---------------- WISHLIST SYNC FLAGS ---------------- */
  const wishlistSyncedRef = useRef(false);
  const [wishlistReady, setWishlistReady] = useState(false);
//   useEffect(() => {
//   if (user) return;

//   const ls = localStorage.getItem("wish");
//   if (ls) {
//     dispatch(loadWish(JSON.parse(ls)));
//   } else {
//     dispatch(loadWish([]));
//   }
// }, [user, dispatch]);


  /* ---------------- LOAD WISHLIST ---------------- */
useEffect(() => {
  if (!user) return;
  if (!wishlistReady) return;

  let cancelled = false;

  async function loadWishlist() {
    try {
      const res = await axiosApiInstance.get(
        `/wishlist/${user._id}`,
        { withCredentials: true }
      );

      if (cancelled) return;

const normalizedItems =
  res.data?.wishlist?.items?.map((row) => ({
    id: row.product_id._id,
    title: row.product_id.name,
    image: row.product_id.thumbnail,
    price: Number(row.product_id.final_price),
  })) || [];

dispatch(loadWish(normalizedItems));
    } catch (err) {
      console.error("Wishlist fetch failed", err);
      dispatch(loadWish([])); // 🛡️ NEVER leave undefined
    }
  }

  loadWishlist();

  return () => {
    cancelled = true;
  };
}, [user, wishlistReady, dispatch]);


  /* ---------------- FETCH CART ---------------- */
//   useEffect(() => {
//     if (!user) return;

//     async function fetchCart() {
//       try {
//         const res = await axiosApiInstance.get(`/cart/${user._id}`);

// const normalizedCart =
//   res.data?.cart?.items?.map((row) => ({
//     id: row.product_id._id,
//     title: row.product_id.name,
//     image: row.product_id.thumbnail,
//     price: Number(row.product_id.final_price),
//     quantity: row.quantity,
//   })) || [];

// dispatch(loadCart(normalizedCart));
//       } catch (error) {
//         console.error("Fetch cart failed", error);
//       }
//     }

//     fetchCart();
//   }, [user, dispatch]);

  /* ---------------- CART SYNC ---------------- */
  const cartSyncedRef = useRef(false);

  useEffect(() => {
  if (!user?._id) return;
  if (cartSyncedRef.current) return;

  cartSyncedRef.current = true;

  async function initializeCart() {
    try {
      // Read guest cart directly from localStorage
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
console.log("===== GUEST CART =====");
console.log(guestCart);
      // Merge only if guest cart exists
      if (guestCart.length > 0) {
        await axiosApiInstance.post("/cart/sync-cart", {
          user_id: user._id,
          cart_data: guestCart,
          source: "guest",
        });
      }
  console.log("===== MERGE RESPONSE =====");
  console.log(mergeRes.data);

      // Always fetch the latest merged cart
      const res = await axiosApiInstance.get(`/cart/${user._id}`);
console.log("===== DB CART AFTER MERGE =====");
console.log(res.data.cart);
      const normalizedCart =
        res.data?.cart?.items?.map((row) => ({
          id: row.product_id._id,
          title: row.product_id.name,
          image: row.product_id.thumbnail,
          price: Number(row.product_id.final_price),
          final_price: Number(row.product_id.final_price),
          original_price: Number(row.product_id.original_price),
          quantity: row.quantity,
        })) || [];

      dispatch(loadCart(normalizedCart));

      // Guest cart no longer needed
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Cart initialization failed", err);
    }
  }

  initializeCart();
}, [user, dispatch]);

  /* ---------------- WISHLIST SYNC ---------------- */
  useEffect(() => {
    if (!user) return;
    if (wishlistSyncedRef.current) return;

;

    async function syncGuestWishlist() {
      try {
        
          await axiosApiInstance.post("/wishlist/merge", {
  user_id: user._id,
  items: wish, // 🔥 REDUX IS SOURCE OF TRUTH
});

        
      } catch (err) {
        console.error("Wishlist sync failed", err);
      } finally {
        wishlistSyncedRef.current = true;
        setWishlistReady(true); // 🔥 LOGIC FIX ONLY
      }
    }

    syncGuestWishlist();
  }, [user]);
  
  function handleSearchSubmit() {
  const value = searchValue.trim().toLowerCase();
  if (!value) return;

  // 🔥 Navigate using PATH param (your store format)
  router.push(`/store/${encodeURIComponent(value)}`);

  setSearchValue("");
  setShowSuggestions(false);
}

  /* ---------------- COUNTS ---------------- */
  const cartCount = cart.reduce((t, i) => t + (i.quantity || 0), 0);
  const wishCount = wish.length;

  /* ---------------- UI STATE ---------------- */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [activeCategory] = useState("All Categories");

  const userRef = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "/about" },
  ];
const categoryRef = useRef(null);

useEffect(() => {
  function handleClickOutside(e) {
    if (categoryRef.current && !categoryRef.current.contains(e.target)) {
      setCategoryOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <header className="sticky top-0 z-9999 bg-white shadow-sm">
      {/* ---------------- TOP BAR ---------------- */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-10 object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-[#01A49E]">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-sm font-medium">{user?.name || "Welcome"}</span>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen((s) => !s)}
              className="w-9 h-9 rounded-full bg-[#01A49E] flex items-center justify-center"
            >
              <UserIcon size={16} className="text-white" />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                <div className="px-5 py-4 bg-gray-50 border-b">
                  <p className="text-sm font-semibold">
                    {user?.name || "Guest User"}
                  </p>
                </div>

                <div className="py-2">
                  <Link href="/profile" className="block px-5 py-3 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/my-orders" className="block px-5 py-3 hover:bg-gray-100">
                    Orders
                  </Link>
                  <Link href="/settings" className="block px-5 py-3 hover:bg-gray-100">
                    Settings
                  </Link>
                </div>

                <div className="border-t">
                  {user ? (
                    <button
                      onClick={() => handleLogout(dispatch)}
                      className="block w-full px-5 py-3 text-center text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="block px-5 py-3 text-center text-red-600 hover:bg-red-50"
                    >
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href="/wishlist" className="relative">
            <div className="w-9 h-9 border rounded-full flex items-center justify-center">
              <Heart size={18} className="text-[#01A49E]" />
            </div>
            {mounted && wishCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                {wishCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative">
            <div className="w-9 h-9 border rounded-full flex items-center justify-center">
              <ShoppingCart size={18} className="text-[#01A49E]" />
            </div>
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button onClick={() => setMobileOpen((s) => !s)} className="lg:hidden p-2">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ---------------- SEARCH BAR ---------------- */}
  <div className="bg-[#01A49E] py-3">
  <div className="max-w-7xl mx-auto px-4">
    <div
      className="
        relative
        flex items-center
        bg-white
        rounded-xl
        max-w-2xl
        shadow-sm
        focus-within:ring-2 focus-within:ring-[#01A49E]/30
      "
    >
      {/* ================= ALL CATEGORIES DROPDOWN (DESKTOP ONLY) ================= */}
      <div className="relative hidden md:block">
        <button
          type="button"
          onClick={() => setCategoryOpen((v) => !v)}
          className="
            flex items-center gap-1
            px-4 py-2
            text-sm font-medium text-gray-700
            border-r border-gray-200
            cursor-pointer
          "
        >
          {activeCategory || "All Categories"}
          <ChevronDown size={14} />
        </button>

        {categoryOpen && (
          <div
            className="
              absolute left-0 top-full mt-1
              w-56
              bg-white
              rounded-lg
              shadow-lg
              border border-gray-200
              z-50
              max-h-72 overflow-y-auto
            "
          >
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  router.push(`/store/${cat.slug}`);
                  setCategoryOpen(false);
                }}
                className="
                  w-full text-left
                  px-4 py-2
                  text-sm text-gray-700
                  hover:bg-gray-100
                "
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ================= SEARCH INPUT ================= */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setShowSuggestions(true);
          setActiveIndex(-1);
        }}
        onKeyDown={(e) => {
          if (!showSuggestions || filteredResults.length === 0) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % filteredResults.length);
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) =>
              i <= 0 ? filteredResults.length - 1 : i - 1
            );
          }

          if (e.key === "Enter") {
            e.preventDefault();
            const selected = filteredResults[activeIndex];
            if (!selected) return;

            const currentCategory =
              window.location.pathname.split("/")[2];

            if (selected.type === "category") {
              router.push(`/store/${selected.slug}`);
            } else {
              if (currentCategory) {
                router.push(
                  `/store/${currentCategory}?brands=${selected.slug}`
                );
              } else {
                router.push(`/store?brands=${selected.slug}`);
              }
            }

            setSearchValue("");
            setShowSuggestions(false);
            setActiveIndex(-1);
          }
        }}
        placeholder="Search products, brands, categories…"
        className="
          flex-1 px-4 py-2.5
          text-sm text-gray-800
          placeholder-gray-400
          outline-none
        "
      />

      {/* ================= SEARCH BUTTON ================= */}
      <button
        type="button"
        onClick={handleSearchSubmit}
        className="
          px-4 py-2
          text-gray-600
          hover:text-gray-900
          active:scale-95
        "
        aria-label="Search"
      >
        <Search size={18} />
      </button>

      {/* ================= SEARCH SUGGESTIONS (CATEGORY + BRAND) ================= */}
      {showSuggestions && searchValue && filteredResults.length > 0 && (
        <div
          className="
            absolute left-0 right-0 top-full mt-1
            bg-white rounded-lg shadow-lg
            border border-gray-200 z-50 overflow-hidden
          "
        >
          {filteredResults.map((item, idx) => (
            <button
              key={`${item.type}-${item.slug}`}
              type="button"
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => {
                const currentCategory =
                  window.location.pathname.split("/")[2];

                if (item.type === "category") {
                  router.push(`/store/${item.slug}`);
                } else {
                  if (currentCategory) {
                    router.push(
                      `/store/${currentCategory}?brands=${item.slug}`
                    );
                  } else {
                    router.push(`/store?brands=${item.slug}`);
                  }
                }

                setSearchValue("");
                setShowSuggestions(false);
                setActiveIndex(-1);
              }}
              className={`
                w-full text-left px-4 py-2 text-sm
                ${idx === activeIndex ? "bg-gray-100" : ""}
              `}
            >
              <div className="flex justify-between">
                <span>{highlightMatch(item.name, searchValue)}</span>
                <span className="text-xs text-gray-400 capitalize">
                  {item.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>




{mobileOpen && (
  <div
    className="
      lg:hidden
      bg-white
      border-t
      animate-slideDown
      shadow-lg
    "
  >
    <div className="px-5 py-6">

      {/* ================= USER ================= */}
      <Link
        href={user?._id ? "/profile" : "/login"}
        onClick={() => setMobileOpen(false)}
        className="
          flex items-center justify-between
          pb-5 border-b
          hover:bg-gray-50
          rounded-lg
          -mx-2 px-2
          transition
        "
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#01A49E]/10 flex items-center justify-center">
            <UserIcon className="text-[#01A49E]" size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {user?._id ? user.name : "Welcome Guest"}
            </h3>

            <p className="text-sm text-gray-500">
              {user?._id
                ? "Manage your account"
                : "Login to continue shopping"}
            </p>
          </div>
        </div>

        <ChevronRight
          size={20}
          className="text-gray-400 flex-shrink-0"
        />
      </Link>

      {/* ================= NAVIGATION ================= */}
      <div className="mt-5 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="
              flex items-center
              py-3
              px-3
              rounded-lg
              text-[15px]
              font-medium
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="mt-6">
        <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
          Quick Access
        </h4>

        <div className="grid grid-cols-2 gap-3">

          <Link
            href="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex flex-col items-center justify-center
              gap-2
              rounded-xl
              border border-gray-200
              py-4
              hover:bg-gray-50
              transition
            "
          >
            <Heart size={20} />

            {mounted && wishCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {wishCount}
              </span>
            )}

            <span className="text-sm font-medium">
              Wishlist
            </span>
          </Link>

          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex flex-col items-center justify-center
              gap-2
              rounded-xl
              bg-[#01A49E]
              text-white
              py-2
              hover:opacity-95
              transition
            "
          >
            <ShoppingCart size={20} />

            {mounted && cartCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}

            <span className="text-sm font-medium">
              Cart
            </span>
          </Link>

        </div>
      </div>

      {/* ================= ACCOUNT ================= */}
      <div className="mt-6 border-t pt-5">


        {user?._id ? (
          <>
            <button
              onClick={() => {
                handleLogout(dispatch);
                setMobileOpen(false);
              }}
              className="
                mt-4
                w-full
                rounded-xl
                bg-red-50
                py-3
                font-semibold
                text-red-600
                hover:bg-red-100
                transition
              "
            >
              Logout
            </button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">

          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex flex-col items-center justify-center
              gap-2
              rounded-xl
              border border-gray-200
              py-4
              hover:bg-gray-50
              transition
            "
          >
            
            <span className="text-sm font-medium">
              login
            </span>
          </Link>

          <Link
            href="/signup"
            onClick={() => setMobileOpen(false)}
            className="
              relative
              flex flex-col items-center justify-center
              gap-2
              rounded-xl
              bg-[#01A49E]
              text-white
              py-2
              hover:opacity-95
              transition
            "
          >
            


            <span className="text-sm font-medium">
              signup
            </span>
          </Link>

        </div>
        )}

      </div>

    </div>
  </div>
)}

    </header>
  );
}
