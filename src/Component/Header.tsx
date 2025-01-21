

import { useUser } from "@/Context/UserContext";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const {logout , user } = useUser()

  const [username ,setUser] = useState<string>()
  useEffect(()=>{
    setUser(user?.name[0])
  }, [user])
  const navigate = useNavigate()
  const location = useLocation();
  const [pathSegment, seTpath] = useState<string>(location.pathname.split('/')[1]) // Extracts 'open'
  useEffect(() => {
    seTpath(location.pathname.split('/')[1])
    console.log(pathSegment);

  }, [pathSegment, location.pathname])


  return (
    <div className="md:px-96 py-8 px-2 text-xs md:text-xl">
      <div>
        <div className="h-12 px-5 bg-black shadow-large rounded-full flex  justify-around items-center md:gap-40 p-3">
          <div className="flex  w-3/5  justify-between text-white " >
            <Link to={"/"}><span className={`hover:text-yellow-400 cursor-pointer ${pathSegment === '' ? "border-b-2 border-yellow-400" : ""}`}>Home</span></Link>
            <Link to={"/dashboard"}><span className={`hover:text-yellow-400 cursor-pointer ${pathSegment === 'dashboard' ? "border-b-2 border-yellow-400" : ""}`}>Dashboard</span></Link>
            <Link to={"/setting"}><span className={`hover:text-yellow-400 cursor-pointer ${pathSegment === 'setting' ? "border-b-2 border-yellow-400" : ""}`}>Setting</span></Link>
          </div>
{  user?(        <div className="flex flex-row items-center w-2/5 gap-2  justify-end">
            <button onClick={()=>{
              logout()
              navigate("/"); }} className="bg-yellow-400 px-3 py-1 text-xs md:text-[20px] md:py-2  rounded-full">
              Sign out
            </button>
            <div className=" text-2xl h-8 w-8 flex items-center justify-center rounded-full bg-white">
              {username}
            </div>
          </div>):(
            <Link to={"/login"}  className="bg-yellow-400 px-4 py-1 text-xs md:text-[20px] md:py-2  rounded-full">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
