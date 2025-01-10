import { SignOutButton, UserButton } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
const location = useLocation();
  const [pathSegment , seTpath] = useState<string>( location.pathname.split('/')[1] ) // Extracts 'open'
  useEffect(()=>{
    seTpath(location.pathname.split('/')[1])
  },[pathSegment , location.pathname])
  console.log(pathSegment);
  
  
  return (
    <div className="md:px-96 py-8 px-2 text-xs md:text-xl">
      <div>
        <div className="h-12 px-5 bg-black shadow-large rounded-full flex  justify-around items-center md:gap-40 p-3">
            <div className="flex  w-3/5  justify-between text-white " >
            <Link to={"/"}><span className={`hover:text-yellow-400 cursor-pointer ${pathSegment === '' ? "border-b-2 border-yellow-400" : ""}`}>Home</span></Link>
            <Link to={"/dashboard"}><span className={`hover:text-yellow-400 cursor-pointer ${pathSegment === 'dashboard' ? "border-b-2 border-yellow-400" : ""}`}>Dashboard</span></Link>
            <Link to={"/setting"}><span  className={`hover:text-yellow-400 cursor-pointer ${pathSegment === 'setting' ? "border-b-2 border-yellow-400" : ""}`}>Setting</span></Link>
            </div>
            <div className="flex flex-row items-center w-2/5 gap-2  justify-end">
            <button className="bg-yellow-400 px-3 py-1 text-xs md:text-1xl  rounded-full">
            <SignOutButton></SignOutButton>
            </button>
            <div className="mt-1"><UserButton></UserButton></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header
