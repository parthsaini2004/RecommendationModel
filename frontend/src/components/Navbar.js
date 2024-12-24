// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ user,setIsSearching,setSearchValue}) => {
//   const items = [
//     "Apple",
//     "Banana",
//     "Orange",
//     "Grapes",
//     "Pineapple",
//     "Mango",
//     "Strawberry",
//   ];
//   const [query, setQuery] = useState("");
//   // const [searching, setIsSearching] = useState(false);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setSearchValue(value);
//     setIsSearching(value.length > 0);
//     // setIsSearching(value.length > 0); // Set searching to true if query is not empty
//   };

//   // Filter the items based on query
//   // const filteredItems = items.filter(item =>
//   //   item.toLowerCase().includes(query.toLowerCase())
//   // );
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // Clear the auth token
//     navigate("/"); // Redirect to the sign-in page
//   };
//   return (
//     <div className="max-w-full  mx-2 my-4 "> {/* Apply max-width to avoid overflow */}
//       <div className="navbar  bg-[#831010] shadow-lg rounded-lg">
//         {/* Left Section */}
//         <div className="flex-1">
//           <a className="cursor-pointer btn btn-ghost normal-case text-3xl font-bold text-[#ffffff]">Recommendation Model</a>
//         </div>

//         {/* Right Section */}
//         <div className="flex-none gap-4 cursor-pointer">
//           {/* Search Input */}
//           {/* <div className="form-control w-[300px]">
//             <input

//               type="text"
//               placeholder="Search"
//               className="input input-bordered btn-ghost font-semibold text-slate-400 bg-white w-32 md:w-auto cursor-pointer"
//             />

//           </div> */}

// <div className="form-control w-[300px] cursor-pointer">
//       <input
//         type="search"
//         placeholder="Search"
//         value={query}
//         onChange={handleInputChange}
//         className="cursor-pointer input input-bordered btn-ghost font-semibold text-slate-400 bg-white w-32 md:w-auto "
//       />
      
//       {/* {searching && query.length > 0 && (
//         <div className="mt-2 w-[300px] bg-white shadow-lg border border-gray-300 rounded-md">
//           <ul className="max-h-40 overflow-y-auto">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="px-4 py-2 cursor-pointer hover:bg-blue-100"
//                 >
//                   {item}
//                 </li>
//               ))
//             ) : (
//               <li className="px-4 py-2 text-gray-500">No results found</li>
//             )}
//           </ul>
//         </div>
//       )} */}
//     </div>

//           {/* Profile Dropdown */}
//           <div className="dropdown dropdown-end mr-2">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost flex items-center gap-2"
//             >
//               {/* Display user's name or fallback */}
//               <div className="w-10 h-10 rounded-full bg-[#dedede] flex justify-center items-center text-lg font-semibold text-gray-700">
//                 {user?.name?.[0]?.toUpperCase() || "U"}
//               </div>
//               {/* Display user's name */}
//               <span className="hidden md:inline text-[#ffffff]">{user?.name.slice(0, 15) || "User"}</span>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-40 "
//             >
//               <li className="my-0">
//               <button  className="btn btn-ghost w-full text-left py-0 max-h-px">
//               Profile
//                {/* <span className="badge badge-secondary"> */}
//                 {/* New */}
//                 {/* </span> */}
//               </button>
                 
                
//               </li >
//               <li className="my-0">
//               <button  className="btn btn-ghost w-full text-left py-0 max-h-px">Settings</button>
//               </li>
//               <li className="my-0">
//               <button onClick={handleLogout} className="btn btn-ghost w-full text-left py-0 max-h-px">
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setIsSearching, setSearchValue }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchValue(value);
    setIsSearching(value.length > 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="max-w-full mx-2 my-4">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>
      <div className="navbar bg-indigo-600 shadow-lg rounded-lg font-[Poppins]">
        {/* Left Section */}
        <div className="flex-1">
          <a
            className="cursor-pointer text-3xl font-bold text-white tracking-wide drop-shadow-lg"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
          >
            Recommendation Model
          </a>
        </div>

        {/* Right Section */}
        <div className="flex-none gap-4">
          {/* Search Input */}
          <div className="form-control w-[300px]">
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              className="input input-bordered bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 w-32 md:w-auto rounded-lg font-medium"
            />
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2"
            >
              {/* Profile Icon */}
              <div
                className="w-10 h-10 rounded-full flex justify-center items-center text-lg font-bold text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                }}
              >
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              {/* User Name */}
              <span className="hidden md:inline text-white font-semibold">
                {user?.name?.slice(0, 15) || "User"}
              </span>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-lg shadow-lg mt-3 w-44"
            >
              <li>
                <button className="btn btn-ghost w-full text-left hover:bg-gray-800 rounded-lg py-2">
                  Profile
                </button>
              </li>
              <li>
                <button className="btn btn-ghost w-full text-left hover:bg-gray-800 rounded-lg py-2">
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost w-full text-left hover:bg-red-600 rounded-lg py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
