import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import Images from './components/Images.jsx';
import NoMatch from './components/NoMatch.jsx';
import AdminUsers from './components/admin/AdminUsers.jsx';
import SavedImages from './components/SavedImages.jsx';
import AdminUserSavedImages from './components/admin/AdminUserSavedImages.jsx';
import AdminUserImages from './components/admin/AdminUserImages.jsx';
import Login from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import facade from './util/apiFacade.js';
import './index.css';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userRoles = facade.getUserRoles(); // Assuming getUserRoles returns an array of roles

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Pass setIsLoggedIn as a prop to the App component */}
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* Route for sign-up, available whether logged in or not */}
        <Route path="/signup" element={<SignUp />} />
        {/* Conditional rendering of routes based on isLoggedIn */}
        {isLoggedIn && (
          <>
            {/* Conditional rendering of 'Images' route */}
            {(userRoles.includes('admin') || userRoles.includes('user')) && (
              <Route path="images" element={<Images />} />
            )}
            {/* Conditional rendering of 'SavedImages' route */}
            {userRoles.includes('user') && (
              <Route path="savedImg" element={<SavedImages />} />
            )}
            {/* Conditional rendering of 'AdminUsers' route */}
            {userRoles.includes('admin') && (
              <Route path="admin/users" element={<AdminUsers />} />
            )}
            {/* Conditional rendering of 'AdminUserPictures' route */}
            {userRoles.includes('admin') && (
              <Route path="admin/users/:username" element={<AdminUserSavedImages />} />
            )}
            {/* Conditional rendering of 'Images' route */}
            {userRoles.includes('admin') && (
              <Route path="admin/images/:username" element={<AdminUserImages />} />
            )}
          </>
        )}
       
        {/* Conditional rendering of 'AdminRoles' route */}
        {/* Route for any other unmatched paths */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
