import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  //axios is a npm package used for only to make an API request
  //this may give you cors error messages
  //cross origin issues
  //read About in internet
  //right now we hndles it in our backend server
  //by taking Express.cors()
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        {
          withCredentials: true,
        }
      ); //read about this withcredentials
      // it show your cookies in your browser console application and cookies section
      //axios set cookies for same domain
      //but we manually set withcredentials and our origin

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res =await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email : emailId, password },
        {
          withCredentials: true,
        }
      ); //dont forget to add the data inside the call because it is required

      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
      // setError(err?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="flex  justify-center my-10">
      <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          {!isLoginForm && (
            <>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend ">FirstName</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend ">LastName</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Email Id</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="Email id"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2 "
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
