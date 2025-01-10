import { useState } from 'react';
import Header from '../Component/Header';
import { Upload, Mail, Send, Wand2, Plus, Trash2 } from 'lucide-react'
// Capitalize the icon component
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Papa from 'papaparse';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EmailContent {
    subject: string;
    body: string;
}
interface CustomEmail {
    email: string;
    profileId: string;
    content: EmailContent;
    mode: 'manual' | 'ai';
    aiPrompt: string;
}

interface Profile {
    id: string;
    name: string;
}
const Home = () => {
    //const [profiles, setProfiles] = useState<string[]>([])
    const [file, setFile] = useState<File | null>()
    const [email, setEmail] = useState<string[]>([])
    const [profiles, setProfile] = useState<Profile[]>([])
    const [profile, setProfile_] = useState<string>()
    const [customemail, setCustomEmails] = useState<CustomEmail[]>([])
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);  // Set file state if needed elsewhere
            Papa.parse(file, {
                header: true, // Parse CSV with headers
                skipEmptyLines: true,
                complete: (results:Papa.ParseResult<{Email?:string}>) => {
                    const data = results.data as { Email?: string }[];
                    const extractedEmails: string[] = data
                    .map(row => row.Email?.trim()) // This can return string or undefined
                    .filter((email): email is string => email !== undefined && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Filters out undefined and invalid emails
                
                    if (extractedEmails.length > 0) {
                        setEmail(extractedEmails);
                        setCustomEmails(extractedEmails
                            .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  // Filter out invalid emails
                            .map(email => ({
                                email: email || "",  // Default to an empty string if email is undefined
                                profileId: '',
                                content: { subject: '', body: '' },
                                mode: 'manual',
                                aiPrompt: ''
                            }))
                        );
                        
                    } else {
                        console.warn("No valid emails found in the uploaded file.");
                    }
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error);
                }
            });
        }
    };
    
    const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const profilename = profile || ""
        setProfile((pro) => ([...pro, { name: profilename, id: Date.now().toString() }]))
        setProfile_("")
       
    }
    const handleUpdate = (email: string, field: keyof CustomEmail | "content", value: any) => {
        setCustomEmails(customemail.map((ce) => {
            if (ce.email === email) {
                if (field === "content") {
                    return {
                        ...ce,
                        content: {
                            ...ce.content,
                            ...value
                        }
                    };
                }
                return {
                    ...ce,
                    [field]: value
                };
            }
            return ce;
        }));
        console.log(customemail);
        
    };
    
    const handlesend = () => {
        console.log(customemail);
        setCustomEmails([])
        
    }
    const handleDelete = (id: string) => {
        const updated_profiles = profiles.filter((pre) => pre.id !== id)
        setProfile(updated_profiles)
    }
    const handleGenerateAIContent = (email: string) => {
        const emailToUpdate = customemail.find(ce => ce.email === email)
        if (emailToUpdate) {
          // Placeholder for AI content generation
          console.log('Generating content with AI using prompt:', emailToUpdate.aiPrompt)
          const generatedSubject = 'AI Generated Subject for ' + email
          const generatedBody = `This is an AI-generated email body for ${email} based on your prompt: "${emailToUpdate.aiPrompt}". You would replace this with actual AI-generated content.`
          
          setCustomEmails(customemail.map(ce => 
            ce.email === email 
              ? { ...ce, content: { subject: generatedSubject, body: generatedBody } }
              : ce
          ))
        }
      }
    
    return (
        <div className=''>
            <Header />
            <div className='md:px-80 flex flex-col gap-10'>
                <div className=' flex md:flex-row flex-col  bg-white shadow-lg rounded-lg p-3 gap-2 '>
                    <div className='md:w-1/2'>

                        <div className='border-2 border-black p-3 rounded-lg'>
                            <h1 className='mb-2'>Upload CSV</h1>
                            <label htmlFor="csv-upload" className="cursor-pointer">
                                <div className="border-2 border-dashed border-black rounded-lg p-4 text-center">
                                    <Upload className="mx-auto md:h-12 w-12 " /> {/* Capitalized 'Upload' */}
                                    <p className="mt-1 text-sm">Click to upload or drag and drop</p>
                                    <p className="text-xs ">CSV file with email addresses</p>
                                </div>
                                {/* Corrected Input tag */}
                                <input
                                    id="csv-upload"
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handlechange}
                                />
                            </label>
                            {file ? (<><h1 className='text-green-500'>{file.name}</h1></>) : (null)}
                        </div>
                    </div>
                    <div className='border-2 border-black p-3 rounded-lg md:w-1/2'>
                        <div className='flex flex-col gap-5'>
                            <span>Profiles</span>

                            <form action="" className='flex flex-row gap-2' onSubmit={handleSubmitProfile}>
                                <input type="text" className=' text-black px-2 border-2 border-black ' placeholder='add profile.....' value={profile} onChange={(e) => (setProfile_(e.target.value))} />
                                <button className='border-2 border-black p-2 rounded-lg tex-sm '>
                                    Add
                                </button>
                            </form>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline">Profiles</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {profiles.map((pro, index) => (
                                            <div className='flex flex-row items-center justify-between'>
                                                <DropdownMenuItem key={index}>{pro.name}</DropdownMenuItem>
                                                <Trash2 className='h-4 cursor-pointer' onClick={() => (handleDelete(pro.id))}></Trash2>
                                            </div>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white shadow-lg rounded-lg  p-3  '>
                    <div className='border-2 border-black p-3 rounded-lg'>
                        <span className='text-3xl font-bold'>Compose Emails</span>
                        <Accordion type='single' collapsible className='w-full'>
                            {customemail.map((ce, index) => (
                                <AccordionItem key={ce.email} value={`item-${index}`}>
                                    <AccordionTrigger>{ce.email}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className='space-y-4'>
                                            <div className='px-2 space-y-2'>
                                                <Label htmlFor={`profile-${index}`}>Profile</Label>
                                                <Select value={ce.profileId}

                                                    onValueChange={(value) => handleUpdate(ce.email, "profileId", value)}
                                                >
                                                    <SelectTrigger id={`profile-${index}`}>
                                                        <SelectValue placeholder="Selecet a profile"></SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='no-profile'>No profile</SelectItem>
                                                        {profiles.map(pr => (
                                                            <SelectItem key={pr.id} value={pr.id}>{pr.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <RadioGroup
                                                value={ce.mode}
                                                className='flex space-x-4'
                                                onValueChange={(value) => handleUpdate(ce.email, "mode", value)}>

                                                <div className="flex items-center space-x-2 px-2">
                                                    <RadioGroupItem value="manual" id={`manual-${index}`} />
                                                    <Label htmlFor={`manual-${index}`}>Write Manually</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="ai" id={`ai-${index}`} />
                                                    <Label htmlFor={`ai-${index}`}>Use AI</Label>
                                                </div>
                                            </RadioGroup>
                                            {ce.mode === "manual" ? (
                                                <div>
                                                    <div className='px-2 space-y-2'>
                                                        <Label htmlFor={`subject-${index}`}>Subject</Label>
                                                        <Input
                                                            id={`subject-${index}`}
                                                            placeholder="Enter subject"
                                                            value={ce.content.subject}
                                                            className='border-2 border-black'
                                                            onChange={(e) => handleUpdate(ce.email, 'content', { subject: e.target.value })}

                                                        />
                                                    </div>
                                                    <div className='px-2 space-y-2'>
                                                        <Label htmlFor={`body-${index}`}>Email Body</Label>
                                                        <Textarea
                                                            id={`body-${index}`}
                                                            placeholder="Enter email body"
                                                            className='border-2 border-black'
                                                            rows={5}
                                                            value={ce.content.body}
                                                            onChange={(e) => handleUpdate(ce.email, 'content', { body: e.target.value })}

                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className='px-2 space-y-2'>
                                                        <Label htmlFor={`ai-prompt-${index}`}>AI Prompt</Label>
                                                        <Textarea
                                                            id={`ai-prompt-${index}`}
                                                            placeholder="Describe the email you want to generate"
                                                            className='border-2 border-black'
                                                            rows={3}
                                                            value={ce.aiPrompt}
                                                            onChange={(e) => handleUpdate(ce.email, 'aiPrompt', e.target.value)}
                                                        />
                                                    </div>
                                                    <Button className="mx-2" onClick={() => handleGenerateAIContent(ce.email)} disabled={!ce.aiPrompt}>
                                                        <Wand2 className="mr-2 h-4 w-4" /> Generate Content
                                                    </Button>
                                                    {ce.content.subject && ce.content.body && (
                                                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                                            <h4 className="font-semibold mb-2">Generated Content:</h4>
                                                            <p><strong>Subject:</strong> {ce.content.subject}</p>
                                                            <p><strong>Body:</strong> {ce.content.body}</p>
                                                        </div>
                                                    )}


                                                </>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
                {customemail.length>0 ? (<div>
                <h3 className="font-semibold mb-2">Email Addresses</h3>
          <div className="bg-gray-100 p-2 rounded-md max-h-40 overflow-y-auto">
            {customemail.map((ce, index) => (
              <div key={index} className="text-sm mb-1">
                <span className="font-medium">{ce.email}</span>
                <span className="text-xs text-gray-500 ml-2">
                  (Profile: {ce.profileId ? (profiles.find(p => p.id === ce.profileId)?.name || 'Unknown') : 'None'})
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  (Mode: {ce.mode === 'manual' ? 'Manual' : 'AI'})
                </span>
              </div>
            ))}
          </div>
                </div>):(null)}
                <div className="mt-4 text-right mb-4">
                    <Button onClick={handlesend} disabled={!file || customemail.some(ce => !ce.content.subject || !ce.content.body)}>
                        Send Campaign
                    </Button>
                </div>
            </div>


        </div>
    );
};

export default Home;
