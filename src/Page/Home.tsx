import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, Send, User } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Papa from 'papaparse';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Switch } from '@/components/ui/switch';
import { useUser } from '@/Context/UserContext';
import Header from '@/Component/Header';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
interface Link {
    label: string; // Changed from Label to label
    url: string;
    email:string;
}

interface EmailContent {
    recipientName?: string,
    to: string;
    subject: string;
    from?: string;
    salutation: string;
    openingline: string;
    body: {
        introduction: string;
        details: string;
        action: string;
    };
    closingline: string;

    regards: string; // E.g., "Best regards," or "Sincerely,"
    name: string; // Sender's name
    mobileNumber?: string; // Optional mobile number
    email?: string; // Optional email address
    linkedInProfile?: string; // Optional LinkedIn profile link
    website?: string; // Optional personal or company website
    other?: string; // Any additional custom information
    link?:Link[];

}

interface CustomEmail {
    email: string;
    profileId: string;
    content: EmailContent;
    mode: string;
    aiPrompt: string;
}



interface User {
    name: string;
    email: string;
    campaign: [];
    setting: string;
    _id: string;
    _v: number;
}
interface Link {
    label: string,
    url: string,
}

const Home = () => {
    const baseURL = import.meta.env.Environment === "prod" ? "https://cold-server-bj3d.vercel.app":"http://localhost:1042"
    const [loggeduser, setUser] = useState<User | null>(null);
    const { login, user } = useUser();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                login(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, [login]);
   
    const [link , setLink] = useState<Link[]>([])
    
    const [enableLink, setEnablelink] = useState<boolean>(false)
    const [followup, setFollowup] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [senderrors, setSendErrors] = useState<string>("");

    const [customemail, setCustomEmails] = useState<CustomEmail[]>([]);
    const [CSVupload, setCSVupload] = useState<boolean>(false);
    const [addedEmails, setAddedEmail] = useState<string>("");
    const [scheduleSend, setScheduleSend] = useState<string>("");
    const [operationaftersend, setOperationAfterSend] = useState<boolean>(false);
    const [isScheduled, setSdheduled] = useState<boolean>(false)
    const [url, seturl] = useState<string>("")
    const [label, setlabel] = useState<string>("")
    const [notUser, setNotuser] = useState<boolean>(false)
    const handleaddLinks = (email:string , newLink:Link) => {
        setLink((pre)=>([...pre , {label:label , url:url , email:email}]))
        console.log(link);
        
        setEnablelink(true)
        setCustomEmails((pre)=>
        pre.map((ce)=>
        ce.email === email ? {...ce , content:{
            ...ce.content,
            link:[...(ce.content.link || []) , newLink]
        }}:ce,
        )
        );
        
        seturl("")
        setlabel("")
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFile(file);
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<{ Email?: string }>) => {
                const validEmails = results.data
                    .map(row => row.Email?.trim())
                    .filter((email): email is string =>
                        email !== undefined &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    );

                if (validEmails.length > 0) {
                    setCustomEmails(prev => [
                        ...prev,
                        ...validEmails.map(email => ({
                            email,
                            profileId: '',
                            content: {
                                recipientName: '',
                                to: ' ',
                                from: '',
                                subject: '',
                                salutation: '',
                                openingline: '',
                                body: {
                                    introduction: '',
                                    details: '',
                                    action: ''
                                },
                                closingline: '',

                                regards: '',
                                name: '',
                                mobileNumber: '',
                                email: '',
                                linkedInProfile: '',
                                website: '',
                                other: '',
                                link:[],

                            },
                            mode: 'manual',
                            aiPrompt: '',
                        })),
                    ]);
                }
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
                setError(true);
                setSendErrors("Error parsing CSV file");
            },
        });
    };


    const handleUpdate = (email: string, field: keyof CustomEmail | "content" | "body", value: any) => {
        setCustomEmails(prevCustomEmails =>
            prevCustomEmails.map(ce => {
                if (ce.email === email) {
                    if (field === "content") {
                        return {
                            ...ce,
                            content: {
                                ...ce.content,
                                ...value,
                            },
                        };
                    } else if (field === "body") {
                        return {
                            ...ce,
                            content: {
                                ...ce.content,
                                body: {
                                    ...ce.content.body,
                                    ...value,
                                },
                            },
                        };
                    }
                    return {
                        ...ce,
                        [field]: value,
                    };
                }
                return ce;
            })
        );
    };



    const handleManualInput = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (addedEmails) {
            const emailsArray = addedEmails.split(',')
                .map(email => email.trim())
                .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

            if (emailsArray.length > 0) {
                setCustomEmails(prev => [
                    ...prev,
                    ...emailsArray.map(email => ({
                        email,
                        profileId: '',
                        content: {
                            recipientName: '',
                            to: '',
                            subject: '',
                            salutation: '',
                            openingline: '',
                            body: {
                                introduction: '',
                                details: '',
                                action: '',
                            },
                            closingline: '',

                            regards: '',
                            name: '',
                            mobileNumber: '',
                            email: '',
                            linkedInProfile: '',
                            website: '',
                            other: '',

                        },
                        mode: 'manual',
                        aiPrompt: '',
                    })),
                ]);
                setAddedEmail("");
            }
        }
    };

    const handleSend = () => {
        console.log(customemail);
        if (!user) {
            console.log("hello");

            setNotuser(true)
            return

        }
        const isValid = customemail.every(email => {
            if (email.mode === 'manual') {
                return email.content.subject &&
                    email.content.salutation &&
                    email.content.openingline &&
                    email.content.body.details &&
                    email.content.closingline;
            }
            return email.mode === 'ai' && email.aiPrompt;
        });

        if (!isValid) {
            setError(true);
            setSendErrors("Please complete all required fields for each email");
            return;
        }

        setOperationAfterSend(true);
    };

    const handleFinalSend = async () => {
        if (!isScheduled) {
            try {
                // Prepare the emails data from customemail state
                const emails = customemail.map((mail) => ({
                    from: mail.content.from,
                    recipientList: mail.email,
                    subject: mail.content.subject,
                    salutation: mail.content.salutation,
                    openingline: mail.content.openingline,
                    introduction: mail.content.body.introduction,
                    details: mail.content.body.details,
                    action: mail.content.body.action,
                    closingline: mail.content.closingline,
                    regards: mail.content.regards,
                    links: link.filter((lin)=>lin.email === mail.email),
                    name: mail.content.name,
                    mobilenumber: mail.content.mobileNumber,
                    recipientName: mail.content.recipientName
                }));

                console.log(emails); // Logs the emails array for debugging

                // Send the emails to the server
                const res = await fetch(`${baseURL}/email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Ensure the server expects JSON
                    },
                    credentials: "include",
                    body: JSON.stringify({ emails, followup_value: false, linkedResume: "hello", aiAssistance: false }), // Send emails as part of the request body
                });

                if (!res.ok) {
                    // If the response is not OK, throw an error
                    throw new Error("Failed to send emails.");
                }

                // Reset state after successful email send
                setCustomEmails([]);
                setFile(null);
                setAddedEmail("");
                setScheduleSend("");
                setFollowup(false);
                setOperationAfterSend(false);

                // Optionally, you can show a success message
                console.log("Emails sent successfully!");

            } catch (error) {
                setError(true);
                setSendErrors("Failed to send emails. Please try again.");
                console.error("Error sending emails:", error);
            }
        }
        else {
            try {
                // Prepare the emails data from customemail state
                const emails = customemail.map((mail) => ({
                    from: mail.content.from,
                    recipientList: mail.email,
                    subject: mail.content.subject,
                    salutation: mail.content.salutation,
                    openingline: mail.content.openingline,
                    introduction: mail.content.body.introduction,
                    details: mail.content.body.details,
                    action: mail.content.body.action,
                    closingline: mail.content.closingline,
                    regards: mail.content.regards,
                    links: link.map((lin)=>lin.email === mail.email),
                    name: mail.content.name,
                    mobilenumber: mail.content.mobileNumber
                }));

                console.log(emails); // Logs the emails array for debugging

                // Send the emails to the server
                const res = await fetch(`${baseURL}/email/schedule`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Ensure the server expects JSON
                    },
                    credentials: "include",
                    body: JSON.stringify({ emails, followup_value: false, linkedResume: "hello", aiAssistance: false, scheduleDate: scheduleSend, }), // Send emails as part of the request body
                });

                if (!res.ok) {
                    // If the response is not OK, throw an error
                    throw new Error("Failed to send emails.");
                }

                // Reset state after successful email send
                setCustomEmails([]);
                setFile(null);
                setAddedEmail("");
                setScheduleSend("");
                setFollowup(false);
                setOperationAfterSend(false);

                // Optionally, you can show a success message
                console.log("Emails sent successfully!");
                console.log(scheduleSend);


            } catch (error) {
                setError(true);
                setSendErrors("Failed to send emails. Please try again.");
                console.error("Error sending emails:", error);
            }
            setSdheduled(false)
        }

    }



    return (
        <div className=''>
            <Header></Header>
            <div className='md:px-80 flex flex-col gap-10'>
                <div className='flex md:flex-row flex-col bg-white shadow-lg rounded-lg p-3 gap-2'>
                    <div className='md:w-[100%]'>
                        <div className='border-2 border-black p-3 rounded-lg'>
                            <Switch checked={CSVupload} onCheckedChange={setCSVupload} />
                            {CSVupload ? (
                                <>
                                    <h1 className='mb-2'>Upload CSV</h1>
                                    <label htmlFor="csv-upload" className="cursor-pointer">
                                        <div className="border-2 border-dashed border-black rounded-lg p-4 text-center">
                                            <Upload className="mx-auto md:h-12 w-12" />
                                            <p className="mt-1 text-sm">Click to upload or drag and drop</p>
                                            <p className="text-xs">CSV file with email addresses</p>
                                        </div>
                                        <input
                                            id="csv-upload"
                                            type="file"
                                            accept=".csv"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    {file && <h1 className='text-green-500'>{file.name}</h1>}
                                </>
                            ) : (
                                <>
                                    <h1 className='mb-2'>Manual Input</h1>
                                    <form onSubmit={handleManualInput} className=''>
                                        <Input
                                            placeholder='enter the email'
                                            value={addedEmails}
                                            onChange={(e) => setAddedEmail(e.target.value)}
                                            className="border-2 border-black"
                                            type='email'
                                        />
                                        <Button className='mt-3'>Add email</Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                <div className='bg-white shadow-lg rounded-lg p-3'>
                    <div className='border-2 border-black p-3 rounded-lg'>
                        <span className='text-3xl font-bold'>Compose Emails</span>
                        <Accordion type='single' collapsible className='w-full'>
                            {customemail.map((ce, index) => (
                                <AccordionItem key={ce.email} value={`item-${index}`}>
                                    <AccordionTrigger>{ce.email}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className='space-y-4'>
                                            <div className='px-2 space-y-2'>

                                            </div>


                                            <div>
                                                <div className='px-2 space-y-2'>
                                                    
                                                    <Label htmlFor={`subject-${index}`}>Subject</Label>
                                                    <Input
                                                        id={`subject-${index}`}
                                                        placeholder="Excited to Join Your Team as a Data Analyst"
                                                        value={ce.content.subject}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { subject: e.target.value })}
                                                    />
                                                    <Label htmlFor={`salutation-${index}`}>Salutation(greeting)</Label>
                                                    <Input
                                                        id={`salutation-${index}`}
                                                        placeholder="Dear Ms. Amanda Hayes,"
                                                        value={ce.content.salutation}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { salutation: e.target.value })}
                                                    />
                                                    <Label htmlFor={`opening-${index}`}>opening line</Label>
                                                    <Input
                                                        id={`opening-${index}`}
                                                        placeholder="I hope this email finds you well"
                                                        value={ce.content.openingline}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { openingline: e.target.value })}
                                                    />
                                                    <Label htmlFor={`opening-${index}`}>Introduction</Label>
                                                    <Input
                                                        id={`opening-${index}`}
                                                        placeholder=" I’m Sarah Carter, and I specialize in operational efficiency and workflow optimization. I came across Acme Corp’s recent expansion into renewable energy solutions, and it’s clear you’re making great strides in revolutionizing the industry."
                                                        value={ce.content.body.introduction}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'body', { introduction: e.target.value })}
                                                    />
                                                </div>
                                                <div className='px-2 space-y-2'>
                                                    <Label htmlFor={`details-${index}`}>Details</Label>
                                                    <Textarea
                                                        id={`details-${index}`}
                                                        placeholder="Enter Details"
                                                        className='border-2 border-black'
                                                        rows={5}
                                                        value={ce.content.body.details}
                                                        onChange={(e) => handleUpdate(ce.email, 'body', { details: e.target.value })}
                                                    />
                                                    <Label htmlFor={`action-${index}`}>Action Items</Label>
                                                    <Input
                                                        id={`action-${index}`}
                                                        placeholder="Could we schedule a quick call to discuss how my skills align with the goals of DataDive Inc.? I am happy to accommodate your availability."
                                                        value={ce.content.body.action}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'body', { action: e.target.value })}
                                                    />
                                                    <Label htmlFor={`closing-${index}`}>Closing line</Label>
                                                    <Input
                                                        id={`closing-${index}`}
                                                        placeholder="Thank you for considering my application. I look forward to the opportunity to contribute to DataDive Inc."
                                                        value={ce.content.closingline}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { closingline: e.target.value })}
                                                    />
                                                    <Label>Regards</Label>
                                                    <Input
                                                        id={`closing-${index}`}
                                                        placeholder="regrds"
                                                        value={ce.content.regards}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { regards: e.target.value })}
                                                    />

                                                    <Label>Name</Label>
                                                    <Input
                                                        id={`closing-${index}`}
                                                        placeholder="john doe"
                                                        value={ce.content.name}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { name: e.target.value })}
                                                    />
                                                    <Label>Mobile number</Label>
                                                    <Input
                                                        id={`closing-${index}`}
                                                        placeholder="+919999999999"
                                                        value={ce.content.mobileNumber}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { mobileNumber: e.target.value })}
                                                    />
                                                    <Label>Please Add the recipient name</Label>
                                                    <Input
                                                        id={`closing-${index}`}
                                                        placeholder="Amanda Hayes"
                                                        value={ce.content.recipientName}
                                                        className='border-2 border-black'
                                                        onChange={(e) => handleUpdate(ce.email, 'content', { recipientName: e.target.value })}
                                                    />
                                                </div>

                                                <div className='px-2 mt-4'>
                                                    <Button onClick={() => (setEnablelink(!enableLink))}>Add Links</Button>
                                                    {enableLink ? (
                                                        <div className=' mt-3 gap-2 flex flex-row items-center'>
                                                            <Input placeholder='Lable' value={label} onChange={(e) => (setlabel(e.target.value))} ></Input>
                                                            <Input placeholder='url' value={url} onChange={(e) => (seturl(e.target.value))}></Input>
                                                            <Button onClick={() => handleaddLinks(ce.email, { label, url , email:ce.email })}
    disabled={!label || !url}>add</Button>
                                                        </div>
                                                    ) : (null)}
                                                    <h1 className='text-1xl mt-3'>Links</h1>
                                                    {link?.map((detail, index) => (
                                                        <div key={index} className='flex flex-row gap-2'>
                                                            {detail.email === ce.email ? (<>
                                                            <span className='font-bold'>{detail.label}</span>
                                                            <span>:</span>
                                                            <span>{detail.url}</span></>):(null)}
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
                {customemail.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2">Email Addresses</h3>
                        <div className="bg-gray-100 p-2 rounded-md max-h-40 overflow-y-auto">
                            {customemail.map((ce, index) => (
                                <div key={index} className="text-sm mb-1">
                                    <span className="font-medium">{ce.email}</span>

                                    <span className="text-xs text-gray-500 ml-2">
                                        (Mode: {ce.mode === 'manual' ? 'Manual' : 'AI'})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4 text-right mb-4">
                    <Button
                        onClick={handleSend}
                        disabled={customemail.length === 0}
                    >
                        <Send className="mr-2 h-4 w-4" />
                        Send Campaign
                    </Button>
                </div>
            </div>
            <AlertDialog open={error} onOpenChange={setError}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Error While Starting the campaign</AlertDialogTitle>
                        <AlertDialogDescription>
                            {senderrors}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Okay</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {operationaftersend && (
                <Dialog open={operationaftersend} onOpenChange={setOperationAfterSend}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Send Campaign</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>

                            <div className='flex flex-col gap-3 mt-4'>
                                <Label className='text-black'>Schedule Send (optional)</Label>
                                <Input
                                    type='datetime-local'
                                    className='md:w-[50%]'
                                    value={scheduleSend}
                                    onChange={(e) => {
                                        setScheduleSend(e.target.value)
                                        setSdheduled(true)
                                    }}
                                />
                            </div>
                        </DialogDescription>
                        <DialogFooter className='flex md:flex-row flex-col gap-3'>
                            <Button variant="outline" onClick={() => setOperationAfterSend(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleFinalSend}>Send</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            <AlertDialog open={notUser} onOpenChange={setNotuser}>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>You are not logged or Signed In </AlertDialogTitle>
                        <AlertDialogDescription>
                            To Start Your campaign please logIn or signUp first!!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-row items-center ">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Link to={"/login"} className='bg-black text-white p-[6px] rounded-md'>Login to Continue</Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default Home;