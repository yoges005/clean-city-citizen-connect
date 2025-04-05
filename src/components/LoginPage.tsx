
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import Header from './Header';
import Footer from './Footer';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Municipal codes and passwords (in a real app, these would be stored securely on the backend)
const municipalCredentials = [
  { code: 'MO8881', password: 'PS8881' },
  { code: 'MO8882', password: 'PS8882' },
  { code: 'MO8883', password: 'PS8883' },
  { code: 'MO8884', password: 'PS8884' },
  { code: 'MO8885', password: 'PS8885' },
  { code: 'MO8886', password: 'PS8886' },
  { code: 'MO8887', password: 'PS8887' },
  { code: 'MO8888', password: 'PS8888' },
  { code: 'MO8889', password: 'PS8889' },
  { code: 'MO8890', password: 'PS8890' },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('citizen');
  
  // Citizen login state
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  // Municipal login state
  const [municipalCode, setMunicipalCode] = useState('');
  const [password, setPassword] = useState('');

  // Handle citizen login (OTP request)
  const handleRequestOtp = () => {
    // Validate mobile number (simple validation for demo)
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    // In a real app, this would make an API call to send an OTP
    // For demo purposes, we'll just show the OTP input field and simulate a sent OTP
    setShowOtpInput(true);
    setOtp(''); // Clear any previous OTP
    toast.success('OTP sent to your mobile number');
    
    // For demo, we'll use a fixed OTP of '1234'
    console.log('OTP code would be sent to:', mobileNumber);
  };

  // Handle citizen OTP verification
  const handleVerifyOtp = () => {
    // In a real app, this would validate the OTP with the backend
    // For demo purposes, we'll accept any 4-digit OTP
    if (!otp || otp.length !== 4 || !/^\d+$/.test(otp)) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }

    // Simulate successful login
    toast.success('Login successful');
    
    // Store user info in localStorage (in a real app, you'd use a more secure method)
    localStorage.setItem('userType', 'citizen');
    localStorage.setItem('userMobile', mobileNumber);
    
    // Redirect to the citizen dashboard
    navigate('/citizen-dashboard');
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  // Handle municipal login
  const handleMunicipalLogin = () => {
    // Validate credentials
    const isValid = municipalCredentials.some(
      cred => cred.code === municipalCode && cred.password === password
    );

    if (!isValid) {
      toast.error('Invalid municipal code or password');
      return;
    }

    // Simulate successful login
    toast.success('Municipal office login successful');
    
    // Store user info in localStorage (in a real app, you'd use a more secure method)
    localStorage.setItem('userType', 'municipal');
    localStorage.setItem('municipalCode', municipalCode);
    
    // Redirect to the municipal dashboard
    navigate('/municipal-dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Clean City Connect</h2>
            <p className="mt-2 text-sm text-gray-600">Login to access the platform</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="citizen">Citizen Login</TabsTrigger>
              <TabsTrigger value="municipal">Municipal Office</TabsTrigger>
            </TabsList>
            
            <TabsContent value="citizen" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Citizen Login</CardTitle>
                  <CardDescription>
                    Login with your mobile number to raise complaints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      disabled={showOtpInput}
                      maxLength={10}
                    />
                  </div>
                  
                  {showOtpInput ? (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter 4-digit OTP</Label>
                      <InputOTP 
                        maxLength={4} 
                        value={otp} 
                        onChange={handleOtpChange}
                        render={({ slots }) => (
                          <InputOTPGroup>
                            {slots.map((slot, index) => (
                              <InputOTPSlot key={index} {...slot} index={index} />
                            ))}
                          </InputOTPGroup>
                        )}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        For demo, use any 4-digit OTP (e.g., 1234)
                      </p>
                    </div>
                  ) : null}
                </CardContent>
                <CardFooter>
                  {showOtpInput ? (
                    <div className="space-y-2 w-full">
                      <Button onClick={handleVerifyOtp} className="w-full">
                        Verify OTP
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRequestOtp()}
                        className="w-full"
                      >
                        Resend OTP
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleRequestOtp} className="w-full">
                      Request OTP
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="municipal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Municipal Office Login</CardTitle>
                  <CardDescription>
                    Login with your municipal code and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="municipalCode">Municipal Code</Label>
                    <Input
                      id="municipalCode"
                      type="text"
                      placeholder="e.g., MO8881"
                      value={municipalCode}
                      onChange={(e) => setMunicipalCode(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use MO8881-MO8890 and PS8881-PS8890 for demo
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleMunicipalLogin} className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
