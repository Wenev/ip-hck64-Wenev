import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import LoginLayout from './layouts/LoginLayout.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './views/Home.jsx';
import CollectionFinder from './views/CollectionFinder.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Login />
      },
    ]
  },
  {
    path: "/sign-up",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Register />
      },
    ]
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "pub/collection",
        element: <CollectionFinder />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
