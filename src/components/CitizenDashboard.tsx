import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Camera, MapPin } from "lucide-react";
import { toast } from 'sonner';
import Header from './Header';
import Footer from './Footer';
import ImageLoader from './ImageLoader';

const mockComplaints = [
  {
    id: 1,
    title: 'Garbage pile on street',
    location: 'MG Road, Bangalore',
    date: '2023-04-01',
    status: 'pending',
    description: 'Large pile of garbage on the side of MG Road near the bus stop',
    images: ['/placeholder.svg'],
  },
  {
    id: 2,
    title: 'Drainage overflow',
    location: 'Church Street, Bangalore',
    date: '2023-03-28',
    status: 'ongoing',
    description: 'Drainage system is overflowing and causing bad smell and mosquitoes',
    images: ['/placeholder.svg'],
  },
  {
    id: 3,
    title: 'Broken street light',
    location: 'Brigade Road, Bangalore',
    date: '2023-03-25',
    status: 'completed',
    description: 'Street light has been broken for over a week causing safety concerns',
    images: ['/placeholder.svg'],
  },
];

const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [activeTab, setActiveTab] = useState('all');
  const [userMobile, setUserMobile] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserMobile = localStorage.getItem('userMobile');
    
    if (storedUserType !== 'citizen' || !storedUserMobile) {
      navigate('/login');
      return;
    }
    
    setUserMobile(storedUserMobile);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userMobile');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const getFilteredComplaints = () => {
    if (activeTab === 'all') return complaints;
    return complaints.filter(complaint => complaint.status === activeTab);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleNewComplaint = () => {
    navigate('/new-complaint');
  };

  const handleViewDetails = (id: number) => {
    toast.info(`Viewing details for complaint #${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="citizen" onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Citizen Dashboard</h1>
            <p className="text-gray-600">Welcome, User {userMobile}</p>
          </div>
          
          <Button onClick={handleNewComplaint} className="bg-clean-blue hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> New Complaint
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Complaints</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredComplaints().map(complaint => (
                <Card key={complaint.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    <ImageLoader 
                      src={complaint.images[0]} 
                      alt={complaint.title}
                      fallbackText={complaint.title} 
                    />
                    <div className="absolute bottom-2 right-2">
                      <Badge className={`${statusColor(complaint.status)} px-3 py-1`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle>{complaint.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-clean-gray" />
                      {complaint.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {complaint.description.length > 100 
                        ? `${complaint.description.substring(0, 100)}...` 
                        : complaint.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Submitted on: {new Date(complaint.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-2 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleViewDetails(complaint.id)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {getFilteredComplaints().length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No complaints found in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CitizenDashboard;
