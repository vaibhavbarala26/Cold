import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,

  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useUser } from "@/Context/UserContext";

const Email = () => {
  const [enableFollow, setFollow] = useState<boolean>(false);

  const emails = [
    "john.doe@example.com",
    "jane.smith@example.org",
    "alex.johnson@example.net",
    "emily.williams@example.com",
    "michael.brown@example.edu",
  ];
  const [showDuplicateEmailDialog, setShowDuplicateEmailDialog] = useState<boolean>(false);
  const [primary, setPrimary] = useState("vaibhavbarala8@gmail.com")
  const days = ["1", "2", "3", "4", "5", "6", "7"];
  const templates = ["Template1", "Template2", "Template3"];
  const [additionalmeail, setAdditionalEmail] = useState<string[]>(emails)
  const [addmail, setAddimail] = useState<string>("")
  //const [emailtone, setEmailtone] = useState<string>("friendly")
  //const [personisation, setPersonisation] = useState<string>("33")
 // const [temolate, setTemplate] = useState<string[]>(templates)
  //const [followuptime, setFollowuptime] = useState<string>("5")
  const [success , setSuccess] = useState<boolean>(false)
  const [emailnoti, setEmailnoti] = useState<boolean>(false)
  const [selectedmail, setSelectedmail] = useState<string>(primary)
  const [performancenoti, setPerformancenoti] = useState<boolean>(false)
  const [selectedTemplate, setSelected] = useState<string>("Template1")
  const [selectedDays, setSelectedDays] = useState<string>("")
  const { toast } = useToast()
 
  const add_Additional_email = async() => {
    const trimmedEmail = addmail.trim();
    if (trimmedEmail) {
      if (additionalmeail.some((mail) => mail === trimmedEmail)) {
        setShowDuplicateEmailDialog(true);
        return;
      }
      setAdditionalEmail((prev) => [...prev, trimmedEmail]);
      const res = await fetch("http://localhost:1042/user/setting/mail",{
        method:"POST",
        headers: {
          "Content-Type": "application/json", // Ensure the server expects JSON
      },
      credentials:"include",
      body:JSON.stringify({additionalmail:addmail})
      })
      if (!res.ok) {
        // If the response is not OK, throw an error
        throw new Error("Failed to send emails.");
    }
      setAddimail("");
    }

  };
  function isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const [isLoading, setIsLoading] = useState(false);
const {user} = useUser()
const HandleSaveSettings = async () => {
  try {
    setIsLoading(true);
    const res = await fetch("http://localhost:1042/user/setting/followup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        template: selectedTemplate,
        followUps: enableFollow,
        followupDays: selectedDays,
      }),
    });

    if (!res.ok) throw new Error("Failed to save follow-up settings.");

    const resr = await fetch("http://localhost:1042/user/setting/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        emailAlerts: emailnoti,
        performanceNotification: performancenoti,
      }),
    });

    if (!resr.ok) throw new Error("Failed to save notification settings.");

    setSuccess(true);
    toast({ description: "Settings saved successfully!" });
    console.log("hello");
    
  } catch (error) {
    toast({
      title: "Error",
      description: error.message,
      action: <ToastAction altText="Retry">Retry</ToastAction>,
    });
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
            <Input placeholder="Enter primary email" value={primary} onChange={(e) => (setPrimary(e.target.value))} />
          </div>
          <div className="mt-4">
            <Label>Additional Email Account</Label>
            <Input placeholder="Additional Email Account" value={addmail} onChange={(e) => (setAddimail(e.target.value))} />
            <div className="flex flex-row items-center gap-6 mt-3">
              <Button onClick={add_Additional_email} disabled={!isValidEmail(addmail)} className="bg-yellow-400 hover:bg-yellow-300">
                Add Email
              </Button>
              <Select value={selectedmail} onValueChange={(value) => setSelectedmail(value)}>
                <SelectTrigger>


                  {selectedmail}
                </SelectTrigger>
                <SelectContent>
                  {additionalmeail.map((email) => (
                    <SelectItem
                      key={email}
                      value={email}

                    >
                      {email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

       

        {/* Campaign Settings Section */}
        <div className="p-4 border-b-2">
          <span className="text-2xl font-bold">Campaign Settings</span>
          <div className="mt-4 flex flex-col gap-3">
            <Label>Default Template</Label>
            <Select value={selectedTemplate} onValueChange={(value) => setSelected(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template} value={template}>
                    {template}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row mb-2 justify-between mt-4 items-center">
            <Label>Follow-up Mails</Label>
            <Switch
              checked={enableFollow}
              onCheckedChange={(checked) => setFollow(checked)}

            />
          </div>
          {enableFollow && (
            <Select value={selectedDays} onValueChange={(value) => (setSelectedDays(value))} >
              <SelectTrigger>
                <SelectValue placeholder="Select time for follow-up mails" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day} Days
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

        </div>

        {/* Notification Settings Section */}
        <div className="p-4 border-b-2">
          <span className="text-2xl font-bold">Notification Settings</span>
          <div className="flex flex-row justify-between mt-4 items-center">
            <span className="font-semibold">Email Alerts</span>
            <Switch
              checked={emailnoti}
              onCheckedChange={(checked) => setEmailnoti(checked)} />
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
      {/* Duplicate Email Alert Dialog */}
      <AlertDialog open={showDuplicateEmailDialog} onOpenChange={setShowDuplicateEmailDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Email Already Exists</AlertDialogTitle>
              <AlertDialogDescription>
                The email address you are trying to add is already in the list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Okay</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      
      </div>
    
  );
};

export default Email;
