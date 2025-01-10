
import { Input } from "@/components/ui/input"
const data = [
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@spoofmail.com"
    },
    {
      "name": "Alex Johnson",
      "email": "alex.johnson@fakeemail.org"
    },
    {
      "name": "Emily Brown",
      "email": "emily.brown@myemail.co"
    },
    {
      "name": "Michael Clark",
      "email": "michael.clark@mockmail.net"
    }
  ]
  
const ContactInfo = () => {
  return (
    <div className="bg-white shadow-lg p-4  rounded-lg">
      <div className="flex flex-col   gap-4" >
        <Input className=""></Input>
       {data.map((dat)=>(
        <>
        <div className="flex flex-row justify-between">
            <span>{dat.name}</span>
            <span>{dat.email}</span>
        </div>
        </>
       ))}
      </div>
    </div>
  )
}

export default ContactInfo
