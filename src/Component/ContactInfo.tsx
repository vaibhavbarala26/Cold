import { Input } from "@/components/ui/input";
import { useState } from "react";

// Define the types for the data and related structures
interface Data {
  address_data: AddressData[];
  totalClickRate: number;
  totalMailSent: number;
  weeklyClicks: WeeklyClicks[];
  weeklyEmails: WeeklyEmails[];
}

interface AddressData {
  name: string;
  emailAddress: string;
}

interface WeeklyClicks {
  day: string;
  clickRate: number;
}

interface WeeklyEmails {
  day: string;
  emailSent: number;
}

const ContactInfo = ({ data }: { data: Data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = data?.address_data.filter((dat) =>
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
        {/* Display filtered data */}
        {filteredData?.length > 0 ? (
          filteredData.map((dat, index) => (
            <div key={index} className="flex flex-row gap-9 justify-between">
              <span>{dat.name || "NA"}</span>
              <span>{dat.emailAddress || "NA"}</span>
            </div>
          ))
        ) : (
          <span>No results found</span> // Handle case when no results are found
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
