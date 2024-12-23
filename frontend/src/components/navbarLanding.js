import React from 'react'

const NavbarLanding = () => {
    return (
        <>
         <div className="max-w-full  mx-2 my-4 "> {/* Apply max-width to avoid overflow */}
      <div className="navbar  bg-[#831010] shadow-lg rounded-lg">
        {/* Left Section */}
        <div className="flex-1">
          <a className="cursor-pointer btn btn-ghost normal-case text-3xl font-bold text-[#ffffff]">Recommendation Model</a>
        </div>

        {/* Right Section */}
        <div className="flex-none gap-4 cursor-pointer">
          {/* Search Input */}
          {/* <div className="form-control w-[300px]">
            <input

              type="text"
              placeholder="Search"
              className="input input-bordered btn-ghost font-semibold text-slate-400 bg-white w-32 md:w-auto cursor-pointer"
            />

          </div> */}

<div className="form-control w-[300px] cursor-pointer">
      <input
        type="search"
        placeholder="Search"
       
        className="cursor-pointer input input-bordered btn-ghost font-semibold text-slate-400 bg-white w-32 md:w-auto "
      />
      
      {/* {searching && query.length > 0 && (
        <div className="mt-2 w-[300px] bg-white shadow-lg border border-gray-300 rounded-md">
          <ul className="max-h-40 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )} */}
    </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center gap-2"
            >
              {/* Display user's name or fallback */}
              
              {/* Display user's name */}
              <span className="hidden md:inline text-[#ffffff]"></span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default NavbarLanding
