import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/image/search", {
        method: "POST",
        body: JSON.stringify({ search: searchTerm }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Done");
        setSearchResults(data);
        setSearchTerm("")
        
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <a href="/" className="btn btn-light mx-2" aria-current="page">
            Dobby
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <a href="/" className="btn btn-light mx-2" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/upload">
                <a href="/" className="btn btn-light mx-2" aria-current="page">
                  Upload-Image
                </a>
              </Link>
            </li>
          </ul>
          <form
            className="form-inline my-2 my-lg-0 mr-auto"
            onSubmit={handleSearch}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/login">
                {!user && (
                  <a
                    href="/"
                    className="btn btn-light mx-2"
                    aria-current="page"
                  >
                    Login
                  </a>
                )}
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/signup">
                {!user && (
                  <a href="/" className="btn btn-light" aria-current="page">
                    SignUp
                  </a>
                )}
              </Link>
            </li>
            <li className="nav-item active">
              {user && (
                <div className="d-flex align-items-center">
                  <span className="">
                    <b>{user.email}</b>
                  </span>
                  <button className="btn" onClick={handleClick}>
                    Log out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
