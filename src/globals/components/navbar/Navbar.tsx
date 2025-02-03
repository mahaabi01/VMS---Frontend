// import { Link, useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../../store/hooks";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user } = useAppSelector((state) => state.auth); //
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // "ey24234"
//     setIsLoggedIn(!!token || !!user.token);
//     // setIsLoggedIn(!false || !true)
//     // setIsLoggedIn(true || false)
//     // setIsLoggedIn(true)
//   }, [user.token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <header
//       id="page-header"
//       className="relative flex flex-none items-center py-8"
//     >
//       {/* Main Header Content */}
//       <div className="container mx-auto flex flex-col gap-4 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl">
//         <div>
//           <a
//             href="#"
//             className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
//           >
//             <svg
//               className="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span>Vendor Management System</span>
//           </a>
//         </div>
//         <nav className="space-x-3 md:space-x-6">
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 to="/login"
//                 className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
//               >
//                 <span>Login</span>
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
//               >
//                 <span>Register</span>
//               </Link>
//             </>
//           ) : (
//             <Link
//               to="#"
//               onClick={handleLogout}
//               className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
//             >
//               <span>Logout</span>
//             </Link>
//           )}
//         </nav>
//       </div>
//       {/* END Main Header Content */}
//     </header>
//   );
// };

// export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../../store/hooks";
// import { useEffect, useState } from "react";
// import { setSearchQuery } from "../../../store/productSlice";
// import { useDispatch } from "react-redux";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user } = useAppSelector((state) => state.auth);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [ query, setQuery ] = useState<string>("");

//   const dispatch = useDispatch()

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token || !!user.token);
//   }, [user.token]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//     dispatch(setSearchQuery(e.target.value))
//   }

//   return (
//     <header
//       id="page-header"
//       className="relative flex flex-none items-center py-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
//     >
//       <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <svg
//             className="hi-mini hi-cube-transparent inline-block w-6 h-6 text-blue-600 dark:text-blue-400"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className="text-lg font-bold">Vendor Management System</span>
//         </div>

//         {/* Search Bar */}
//         <div className="mt-10 flex-grow max-w-lg mx-auto">
//           <input
//             type="text"
//             placeholder="Search Products..."
//             className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
//           />
//         </div>

//         {/* Authentication Links */}
//         <nav className="space-x-3">
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 to="/login"
//                 className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <div className="group relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
//               <button className="text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
//                 Menu Options
//               </button>

//               {/* Hidden by default and shown on hover */}
//               {/* <div className="absolute left-0 top-full mt-2 space-y-4 hidden group-hover:block bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md"> */}
//               <div className="absolute left-0 top-full mt-2 space-y-4 hidden group-hover:block bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform origin-top scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100">
//                 <Link
//                   to={`/user/myCart`}
//                   className="block text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   My Cart
//                 </Link>
//                 <Link
//                   to={`/myWishList/${user.id}`}
//                   onClick={handleLogout}
//                   className="block text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   My WishList
//                 </Link>
//                 <Link
//                   to={`/myCreditLedger`}
//                   onClick={handleLogout}
//                   className="block text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   My Credit Ledger
//                 </Link>
//                 <Link
//                   to="#"
//                   onClick={handleLogout}
//                   className="block text-sm font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                 >
//                   Logout
//                 </Link>
//               </div>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


//deepseek code
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { setSearchQuery } from "../../../store/productSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token || !!user?.token);
  }, [user?.token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    dispatch(setSearchQuery(searchTerm));
  };

  return (
    <div>
      <header className="relative flex items-center py-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Vendor Management System</span>
          </div>

          {/* ✅ Search Bar */}
          <div className="flex-grow max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search Products..."
              value={query}
              onChange={handleSearch}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Authentication Links */}
          <nav className="space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="group relative p-4 bg-gray-100 dark:bg-white rounded-lg shadow-md">
                <button className="text-sm font-semibold text-gray-800 hover:text-blue-600">
                  Menu Options
                </button>

                {/* Hidden by default and shown on hover */}
                <div className="absolute left-0 top-full mt-2 space-y-4 hidden group-hover:block bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  
                  <Link
                    to={`/user/myCart`}
                    className="block text-sm font-semibold text-white-800 hover:text-blue-600"
                  >
                    My Cart
                  </Link>
                  <Link
                    to={`/myWishList`}
                    className="block text-sm font-semibold text-white-800 hover:text-blue-600"
                  >
                    My WishList
                  </Link>
                  <Link
                    to={`/myCreditLedger`}
                    className="block text-sm font-semibold text-white-800 hover:text-blue-600"
                  >
                    My Credit Ledger
                  </Link>
                  <Link
                    to={`/checkOut`}
                    className="block text-sm font-semibold text-white-800 hover:text-blue-600"
                  >
                    Check Out
                  </Link>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="block text-sm font-semibold text-white-800 hover:text-blue-600"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;