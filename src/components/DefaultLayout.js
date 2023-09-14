import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="header flex justify-between p-5 bg-green-400 shadow items-center">
        <h1
          className="text-3xl ml-7 font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <b className="text-primary">RHYTHMO</b>{" "}
        </h1>
        <div className="flex items-center gap-2">
          <Link to="/admin">
            {/* <h1 className="text-xl">Admin Panel</h1> */}
            <button className="relative overflow-hidden rounded-full w-40 h-10 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white">Admin Panel</span>
              </div>
              <div className="absolute inset-0 transform scale-x-0 scale-y-1 bg-white origin-right transition-transform ease-in duration-300"></div>
              <div className="absolute inset-0 transform scale-x-0 scale-y-1 bg-white origin-right transition-transform ease-in duration-300 delay-100"></div>
              <div className="absolute inset-0 transform scale-x-0 scale-y-1 bg-white origin-right transition-transform ease-in duration-300 delay-200"></div>
              <div className="absolute inset-0 transform scale-x-0 scale-y-1 bg-white origin-right transition-transform ease-in duration-300 delay-300"></div>
            </button>
          </Link>

          <h1 className="text-xl">{user?.name.toUpperCase()}</h1>
          <i
            className="ri-logout-circle-r-line text-xl cursor-pointer"
            onClick={() => {
              toast.error("You are Logged Out");
              localStorage.removeItem("token");
              window.location.reload();
            }}
          ></i>
        </div>
      </div>
      <div className="content m-10">{children}</div>
    </div>
  );
}

export default DefaultLayout;
