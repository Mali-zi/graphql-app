import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/login" className="btn btn-primary me-3">
          Log In
        </NavLink>
        <NavLink to="/signup" className="btn btn-primary me-3">
          Sing Up
        </NavLink>
        <button
          type="button"
          className="btn btn-primary me-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="container">
        <p>Welcome Home</p>
      </div>
    </div>
  );
};

export default Welcome;
