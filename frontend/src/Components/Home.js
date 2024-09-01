import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {/* if the user is logged in display the user details in the this page from the localstorage */}
      {user.userId && (
        <div>
          <h3>User Details</h3>
          <p>User Id: {user.userId}</p>
          <p>User Name: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
