"use client";
import { useDispatch,useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setName, setUsername, setEmail, setAddressLine1, setAddressLine2 } from "@/store/formSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

import { motion } from "framer-motion";
import { useState,useEffect } from "react";

export default function Steps() {
  const { toast } = useToast();

  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const {name,username,email,addressLine1,addressLine2} = useSelector(state=>state.form)
  const validateEmail = (value)=> {
    dispatch(setEmail(value));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleSaveChanges = () => {
    if (!name || !username || !email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (emailError) {
      toast({
        title: "Error",
        description: "Please provide a valid email.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Changes saved successfully.",
      variant: "default",
    });
  };

  const tabs = [
    { value: "Personal", label: "Personal" },
    { value: "Address", label: "Address Details" },
    { value: "Preferences", label: "Preferences" },
    { value: "Review", label: "Review" },
  ];

  const [activeTab, setActiveTab] = useState("Personal");
  const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
  const progressPercentage = ((currentIndex + 1) / tabs.length) * 100;

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch("/api/form"); 
        if (response.ok) {
          const data = await response.json();
          dispatch(setName(data.name));
          dispatch(setUsername(data.username));
          dispatch(setEmail(data.email));
          dispatch(setAddressLine1(data.addressLine1));
          dispatch(setAddressLine2(data.addressLine2));
        } else {
          console.error("Failed to fetch form data");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    
    const interval = setInterval(fetchFormData, 10000);

    
    fetchFormData();

    
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <ToastProvider>
      <motion.div
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut", bounce: 0.3 }}
      >
        
        <Progress value={progressPercentage} className="mb-4" />

        <Tabs
          defaultValue="Personal"
          className="w-full p-1"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="w-full flex justify-between px-1">
            {tabs.map((tab) => (
              <motion.div
                key={tab.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <TabsTrigger  className="dark:bg-gray-800 ml-1 bg-gray-100 text-[0.7rem] w-[25%]  md:text-base" value={tab.value}>{tab.label}</TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -50, rotate: 5 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Personal Information Tab */}
            <TabsContent value="Personal" className="w-full">
              <Card className="dark:bg-gray-800 bg-gray-100">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Fill in your personal details. Click save when done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="focus:ring focus:ring-blue-300"
                            value={name}
                            onChange={(e) => dispatch(setName(e.target.value))}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Enter your full name</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Input
                            id="username"
                            placeholder="johndoe123"
                            className="focus:ring focus:ring-blue-300"
                            value={username}
                            onChange={(e) => dispatch(setUsername(e.target.value))}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Choose a unique username</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Input
                            id="email"
                            placeholder="johndoe@example.com"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            className={`focus:ring ${emailError ? "focus:ring-red-500" : "focus:ring-green-500"}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Enter a valid email address</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {emailError && (
                      <p className="text-sm text-red-500">{emailError}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button onClick={handleSaveChanges}>Save changes</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Other Tabs */}
            <TabsContent value="Address">
              <Card className="dark:bg-gray-800 bg-gray-100">
                <CardHeader>
                  <CardTitle>Address Details</CardTitle>
                  <CardDescription>Enter your address information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="address-line-1">Address Line 1</Label>
                  <Input id="address-line-1" value={addressLine1} onChange={(e)=>dispatch(setAddressLine1(e.target.value))} placeholder="123 Main St" />
                  <Label htmlFor="address-line-2">Address Line 2</Label>
                  <Input id="address-line-2" value={addressLine2} onChange={(e)=>dispatch(setAddressLine2(e.target.value))} placeholder="Apartment, suite, etc." />
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button>Next</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="Preferences">
              <Card className="dark:bg-gray-800 bg-gray-100">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your preferences by toggling the switches below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                    <Switch id="dark-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-updates">Enable Auto Updates</Label>
                    <Switch id="auto-updates" />
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button>Save Preferences</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="Review">
              <Card className="dark:bg-gray-800 bg-gray-100">
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>
                    Review all the information and submit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    Please confirm that all the provided information is correct
                    before submitting.
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button>Submit</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </ToastProvider>
  );
}
