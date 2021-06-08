import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [sentence, setSentence] = useState("");
  const [detail, setDetails] = useState("");
  const [prevTarget, setPrevTarget] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("https://randomuser.me/api");

      setUserData(response.data.results);
      if (userData.length > 0) {
        setSentence("Hi, my name is");
        setDetails(`${userData[0].name.first} ${userData[0].name.last}`);
      }
    };
    getUserData();
  }, []);
  const handleMouseHover = (e) => {
    e.preventDefault();
    const id = e.target.id;
    if (id === "user") {
      setSentence("Hi, my name is");
      setDetails(`${userData[0].name.first} ${userData[0].name.last}`);
    } else if (id === "email") {
      setSentence("My email address is");
      setDetails(userData[0].email);
    } else if (id === "dob") {
      setSentence("My birthday is");
      setDetails(
        `${userData[0].dob.date.split("-")[2].split("T")[0]}/${
          userData[0].dob.date.split("-")[1]
        }/${userData[0].dob.date.split("-")[0]}`
      );
    } else if (id === "location") {
      setSentence("My address is");
      setDetails(
        `${userData[0].location.street.number} ${userData[0].location.street.name}`
      );
    } else if (id === "call") {
      setSentence("My phone number is");
      setDetails(userData[0].phone);
    } else if (id === "password") {
      setSentence("My password is");
      setDetails(userData[0].login.password);
    }
  };
  return (
    <div className="App">
      {userData.length > 0 && (
        <>
          <div className="banner">
            <div>
              <img src={userData[0].picture.large} />
            </div>
          </div>
          <div className="details">
            <h3>{sentence}</h3>
            <h2>{detail}</h2>
          </div>
          <div className="options">
            <div id="user" onMouseEnter={handleMouseHover}>
              <img src="/images/user.svg" />
            </div>
            <div id="email" onMouseEnter={handleMouseHover}>
              <img src="/images/email.svg" />
            </div>
            <div id="dob" onMouseEnter={handleMouseHover}>
              <img src="/images/calendar.svg" />
            </div>
            <div id="location" onMouseEnter={handleMouseHover}>
              <img src="/images/map.svg" />
            </div>
            <div id="call" onMouseEnter={handleMouseHover}>
              <img src="/images/call.svg" />
            </div>
            <div id="password" onMouseEnter={handleMouseHover}>
              <img src="/images/padlock.svg" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
//onMouseEnter={()=>{}
export default App;
