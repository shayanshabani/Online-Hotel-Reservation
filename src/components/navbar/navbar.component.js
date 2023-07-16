import React, { Component } from "react";
import logo from "../../images/logo.svg";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function getUserCookie() {

  const cookieName = "user=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  // find the value with key: "user"
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.startsWith(cookieName)) {
          return cookie.substring(cookieName.length);
      }
  }
  return null;
}

class Navbar extends Component {
  state = {
    isOpen: false,
    loggedIn: getUserCookie() != null ? true : false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} />
            </Link>
            <button
              onClick={this.handleToggle}
              type="button"
              className="nav-btn"
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          {!this.state.loggedIn && 
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms/">Rooms</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/signup/">SignUp</Link>
            </li>
          </ul>
          }
          {this.state.loggedIn && 
            <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rooms/">Rooms</Link>
            </li>
            <li>
              <Link to="/profile/">Profile</Link>
            </li>
          </ul>
          }
        </div>
      </nav>
    );
  }
}

export default Navbar;
