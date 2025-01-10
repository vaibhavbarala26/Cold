import { SignIn } from "@clerk/clerk-react"

const Login = () => {
  return (
    <div className="h-[100vh] bg-red-600  ">
      <div className="w-[100vw] flex md:flex-row flex-col">
        <div className="h-[100vh] md:w-1/2 hidden md:block bg-blue-700">

        </div>
        <div className="h-[100vh] md:w-1/2 bg-green-700 flex items-center justify-center">
        <SignIn></SignIn>
        </div>
      </div>
    </div>
  )
}

export default Login
