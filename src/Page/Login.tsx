import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import google from "../assets/google.png"
const Login = () => {
  const handleGoogleLogin = ()=>{
    window.location.href = 'http://localhost:1042/user/auth'
  }
  return (
    <div className="h-[100vh] bg-red-600  ">
      <div className="w-[100vw] flex md:flex-row flex-col">
        <div className="h-[100vh] md:w-1/2 hidden md:block bg-blue-700">

        </div>
        <div className="h-[100vh] md:w-1/2 bg-green-700 flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Please login to your Google account</CardDescription>
            </CardHeader>
            <CardContent>
             <div onClick={handleGoogleLogin} className="h-10 flex flex-row  items-center justify-around rounded-md p-3 cursor-pointer bg-white border-2 ">
              <img src={google} className="h-8" alt="" />
              <span>Login with google</span>
             </div>
            </CardContent>
            
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Login
