import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import LoginLayout from './layouts/LoginLayout.jsx';
import Login from './views/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        path: "",
        element: <Login />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
