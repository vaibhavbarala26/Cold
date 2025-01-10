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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const Email = () => {
  const [enableFollow, setFollow] = useState<boolean>(false);

  const emails = [
    "john.doe@example.com",
    "jane.smith@example.org",
    "alex.johnson@example.net",
    "emily.williams@example.com",
    "michael.brown@example.edu",
  ];

  const days = ["1", "2", "3", "4", "5", "6", "7"];
  const templates = ["Template1", "Template2", "Template3"];

  return (
    <div className="md:px-96">
      <div className="bg-white flex flex-col gap-4 shadow-lg p-4">
        
        {/* Email Configuration Section */}
        <div className="border-b-2 p-3 rounded-t-lg">
          <span className="text-2xl font-bold">Email Configuration</span>
          <div className="mt-4">
            <Label>Primary Email</Label>
            <Input placeholder="Enter primary email" />
          </div>
          <div className="mt-4">
            <Label>Additional Email Account</Label>
            <Input placeholder="Additional Email Account" />
            <div className="flex flex-row items-center gap-6 mt-3">
              <Button className="bg-yellow-400 hover:bg-yellow-300">
                Add Email
              </Button>
              <Select>
                <SelectTrigger>
                  
                    Emails
                  
                </SelectTrigger>
                <SelectContent>
                  {emails.map((email) => (
                    <SelectItem key={email} value={email}>
                      {email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* AI Preferences Section */}
        <div className="p-4 border-b-2 ">
          <span className="text-2xl font-bold">AI Preferences</span>
          <div className="mt-4">
            <span className="font-semibold">Email Tone</span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Personalization Level</span>
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
          <Button className="mt-4 bg-yellow-400 hover:bg-yellow-300">
            Save AI Preferences
          </Button>
        </div>

        {/* Campaign Settings Section */}
        <div className="p-4 border-b-2">
          <span className="text-2xl font-bold">Campaign Settings</span>
          <div className="mt-4">
            <Label>Default Template</Label>
            <Select>
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
            <Select >
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
            <Switch />
          </div>
          <div className="flex flex-row justify-between mt-4 items-center">
            <span className="font-semibold">Performance Notifications</span>
            <Switch />
          </div>
          <Button className="mt-4 bg-yellow-400 hover:bg-yellow-300">
            Save Notification Settings
          </Button>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-300">Save All Settings</Button>
      </div>
    </div>
  );
};

export default Email;
