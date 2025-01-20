import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { PrimeReactProvider } from 'primereact/api';

import {
  createBrowserRouter,

  RouterProvider,
} from "react-router-dom";
import Login from './Page/Login'
import Register from './Page/Register';
import Home from './Page/Home';
import Dashboard from './Page/Dashboard';
import Setting from './Page/Setting';
import { UserProvider} from './Context/UserContext';
import ProtectedRoute from './Component/Protected_Routes';
// Import your Publishable Key

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login></Login>
    ),
  },
  {
    path:"/register",
    element:(
      <Register></Register>
    )
  },
  {
    path:"/",
    element:(
      <> 
      <Home></Home> 
      </>
      
    )
  },
  {
    path:"/dashboard",
    element:<ProtectedRoute>
      <Dashboard>
      </Dashboard>
      </ProtectedRoute>
  },

  {
    path:"/setting",
    element:<ProtectedRoute>
    <Setting></Setting>
    </ProtectedRoute>
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <PrimeReactProvider>

    <RouterProvider router={router} />
  
    </PrimeReactProvider>
    </UserProvider>
  </React.StrictMode>,
)