import { Input } from "@/components/ui/input";
import { useState } from "react";
interface data{
  name:string,
  emailAddress:string
}
const ContactInfo = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = data?.address_data.filter((dat:data) =>
    (dat?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dat?.emailAddress?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        {/* Search input */}
        <Input
          className=""
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        {/* Display filtered da */}
        {filteredData?.map((dat:data, index:number) => (
          <div key={index} className="flex flex-row gap-9 justify-between">
            <span>{dat?.name || "NA"}</span>
            <span>{dat.emailAddress}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
