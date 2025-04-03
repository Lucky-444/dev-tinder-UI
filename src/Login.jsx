import axios from "axios";
import { useState } from "react";


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5173/login", {
        emailId,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex  justify-center my-10">
      <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
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
                type="text"
                value={password}
                className="input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center py-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
