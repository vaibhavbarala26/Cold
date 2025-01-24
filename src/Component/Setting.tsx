import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useUser } from "@/Context/UserContext";

const Email = () => {
  const {user} = useUser()
  console.log(user);
  const [primary, setPrimary] = useState(user?.email);
  const [emailnoti, setEmailnoti] = useState(false);
  const [performancenoti, setPerformancenoti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
 
  
  const HandleSaveSettings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://cold-server-bj3d.vercel.app/user/setting/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          emailAlerts: emailnoti,
          performanceNotification: performancenoti,
        }),
      });

      if (!res.ok) throw new Error("Failed to save notification settings.");
      toast({ description: "Settings saved successfully!" });
      console.log("Settings saved.");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:px-96">
      <div className="bg-white flex flex-col gap-4 shadow-lg p-4">
        {/* Email Configuration Section */}
        <div className="border-b-2 p-3 rounded-t-lg">
          <span className="text-2xl font-bold">Email Configuration</span>
          <div className="mt-4">
            <Label>Primary Email</Label>
            <Input
              placeholder="Enter primary email"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="p-4 border-b-2">
          <span className="text-2xl font-bold">Notification Settings</span>
          <div className="flex flex-row justify-between mt-4 items-center">
            <span className="font-semibold">Email Alerts</span>
            <Switch
              checked={emailnoti}
              onCheckedChange={(checked) => setEmailnoti(checked)}
            />
          </div>
          <div className="flex flex-row justify-between mt-4 items-center">
            <span className="font-semibold">Performance Notifications</span>
            <Switch
              checked={performancenoti}
              onCheckedChange={(checked) => setPerformancenoti(checked)}
            />
          </div>
        </div>

        <Button
          onClick={HandleSaveSettings}
          className="bg-yellow-400 hover:bg-yellow-300"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </div>
  );
};

export default Email;
