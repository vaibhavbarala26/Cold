import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"

import Header from "../Component/Header";
import CampaignOverview from "@/Component/CampaignOverview";
import QuickAction from "@/Component/QuickAction";
import CampaignPerformance from "@/Component/CampaignPerformance";
import RecentActivity from "@/Component/RecentActivity";
import ContactInfo from "@/Component/ContactInfo";
import { useUser } from "@/Context/UserContext";

const Dashboard = () => {
  const [Dashboard_data, setDash_board_Data] = useState(null);
  const [error, setError] = useState(null); // For error handling
  const { user } = useUser();

  useEffect(() => {
    const Auto_Fetch = async () => {
      try {
        const res = await fetch("http://localhost:1042/user/dashboard", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setDash_board_Data(data);
      } catch (err:any) {
        setError(err.message);
      }
    };
    Auto_Fetch();
  }, [user]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <div className="overflow-x-hidden text-center">
      <Header />
      <div className="flex flex-col justify-center items-center">
        {/* First Row */}
        <div className="flex md:flex-row flex-col items-center gap-10 justify-center">
          {Dashboard_data ? (
            <>
           
            <CampaignOverview data={Dashboard_data} />
            <QuickAction />
            </>
          ) : (
            <Skeleton className="h-48 w-80" /> // Using ShadCN Skeleton
          )}
         
        </div>

        {/* Campaign Performance */}
        <div className="px-14 md:px-96 mt-10">
          {Dashboard_data ? (
            <CampaignPerformance data={Dashboard_data} />
          ) : (
            <Skeleton className="h-72 w-full" /> // Using ShadCN Skeleton
          )}
        </div>

        {/* Recent Activity and Contact Info */}
        <div className="flex md:flex-row flex-col md:items-start gap-10 justify-center mt-10 mb-10">
          {Dashboard_data ? (
            <>
              <RecentActivity />
              <ContactInfo data={Dashboard_data} />
            </>
          ) : (
            <>
              <Skeleton className="h-36 w-72" /> {/* Recent Activity Skeleton */}
              <Skeleton className="h-36 w-72" /> {/* Contact Info Skeleton */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
