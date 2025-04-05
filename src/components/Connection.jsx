import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connection = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // handle response here
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
      // handle error here
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connection) return <div>No Connections</div>;
  if (connection.length === 0) return <div>No Connections</div>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-4xl">Connectios</h1>
      {connection.map((c) => {
        const { firstName, lastName, photoUrl, about, gender, age } = c;

        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={c._id}>   
            <div>
              <img alt="photo" className="m-50 h-20 rounded-full my-2"  src={photoUrl || "/default-avatar.png" } />
            </div>
            <div className="text-left ml-4"> 
              <h2>{firstName + " "  + lastName}</h2>  
             {gender && <h2>{gender}</h2>}
              { age && <h2>{age}</h2> }   
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
