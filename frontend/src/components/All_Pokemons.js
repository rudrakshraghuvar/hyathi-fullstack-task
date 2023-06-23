import axios from "axios";
import React, { useEffect, useState, Navigate } from "react";
import { useNavigate } from "react-router-dom";
import Listitems from "./Listitems";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import Loader from "./Loader";

const AllPokemons = () => {
  const [isLoading, setisLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [isloggedIn, setisloggedIn] = useState(false);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // try {
  //   const data = localStorage.getItem("userInfo");
  //   if (!data) <Navigate to="/login" />;
  //   else {
  //     const newdata = JSON.parse(data);
  //     const name = newdata.name;
  //     console.log(name);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

//   const removeInt = async (id) => {
//     const tempInt = interviews.filter((inter) => {
//       return inter._id != id;
//     });
//     setinterviews([...tempInt]);

//     try {
//       console.log("remove");
//       await axios.put(`/interview/${id}`);

//       // navigate("/");
//     } catch (error) {
//       console.log(error.msg);
//     }
//   };

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    return async function getdata() {
      try {
        const res = await axios.get("http://localhost:5000/pokemon");

        if (res.data.length > 0) {
          setPokemons([...res.data]);
        }
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(pokemons);
  }, []);

  return (
    <div>
      {!isLoading && pokemons ? (
        <>
          <Navbar />
          <h1>All Pokemons</h1>
          <center>{/* <h3>Welcome {name}</h3> */}</center>

          {pokemons.map((item) => (
            <Listitems item={item} key={item._id}  />
          ))}
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default AllPokemons;
