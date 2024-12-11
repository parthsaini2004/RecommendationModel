import React from "react";

const Navbar = ({ user }) => {
  return (
    <div className="max-w-full  mx-2 my-4 "> {/* Apply max-width to avoid overflow */}
      <div className="navbar  bg-[#831010] shadow-lg rounded-lg">
        {/* Left Section */}
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-3xl font-bold text-[#ffffff]">Recommendation Model</a>
        </div>

        {/* Right Section */}
        <div className="flex-none gap-4">
          {/* Search Input */}
          <div className="form-control w-[300px]">
            <input
            
              type="text"
              placeholder="Search"
              className="input input-bordered btn-ghost text-white bg-white w-32 md:w-auto cursor-pointer"
            />
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2"
            >
              {/* Display user's name or fallback */}
              <div className="w-10 h-10 rounded-full bg-[#dedede] flex justify-center items-center text-lg font-semibold text-gray-700">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              {/* Display user's name */}
              <span className="hidden md:inline text-[#ffffff]">{user?.name.slice(0, 15) || "User"}</span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52"
            >
              <li>
                <a>
                  Profile <span className="badge badge-secondary">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
