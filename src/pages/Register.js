import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const register = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.post("/api/users/register", user);
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Something Went wrong");
  //     dispatch(HideLoading());
  //     console.log(error);
  //   }
  // };

  //--------------------------------------------------------
  const [passwordValidationError, setPasswordValidationError] = useState("");

  const register = async () => {
    try {
      dispatch(ShowLoading());

      // Custom validation checks
      if (user.name.length < 3) {
        toast.error("Name must be at least 3 characters long");
        dispatch(HideLoading());
        return;
      }

      if (!isValidEmail(user.email)) {
        toast.error("Invalid email format");
        dispatch(HideLoading());
        return;
      }

      // if (!isValidPassword(user.password)) {
      //   // toast.error("Invalid password format");
      //   setPasswordValidationError(
      //     "should contain one capital letter, one special character, one Number, and  8 characters long."
      //   );
      //   dispatch(HideLoading());
      //   return;
      // }
      const passwordErrors = validatePassword(user.password);
      if (passwordErrors.length > 0) {
        setPasswordValidationError(passwordErrors);
        dispatch(HideLoading());
        return;
      }

      const response = await axios.post("/api/users/register", user);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };

  // Custom function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Custom function to validate password format
  // const isValidPassword = (password) => {
  //   const passwordRegex =
  //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test(password);
  // };
  // Custom function to validate password format
  const validatePassword = (password) => {
    const passwordErrors = [];

    if (password.length < 8) {
      passwordErrors.push("Password must be 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      passwordErrors.push("Should contain one capital letter");
    }

    if (!/\d/.test(password)) {
      passwordErrors.push("Should contain at least one number");
    }

    if (!/[@$!%*?&]/.test(password)) {
      passwordErrors.push("should contain one special character");
    }

    return passwordErrors;
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <img
          className="h-[500px]"
          src="https://img.freepik.com/premium-photo/3d-rendering-3d-illustration-red-black-music-note-icon-isolated-white-background-song-melody-tune-symbol-concept_640106-443.jpg?w=2000"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 w-96 p-5  ">
        <h1 className="text-3xl font-bold text-secondary">Welcome </h1>
        <hr />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {/* {passwordValidationError && (
          <div className="text-red-500">{passwordValidationError}</div>
        )} */}
        {passwordValidationError.length > 0 && (
          <div className="text-red-500">
            <ul>
              {passwordValidationError.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <button className="primary bg-primary" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-secondary underline">
          Already Registered ? Click Here To Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
