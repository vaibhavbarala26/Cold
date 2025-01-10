import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { PrimeReactProvider } from 'primereact/api';

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import Login from './Page/Login'
import Register from './Page/Register';
import Home from './Page/Home';
import Dashboard from './Page/Dashboard';
import Setting from './Page/Setting';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
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
      <SignedIn>
      <Home></Home>
      </SignedIn>
      <SignedOut>
        <Link to={"/login"}>Login</Link>
      </SignedOut>
      </>
      
    )
  },
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>
  },
  {
    path:"/setting",
    element:<Setting></Setting>
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    </ClerkProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)