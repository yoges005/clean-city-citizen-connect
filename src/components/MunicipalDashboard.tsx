import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, CalendarIcon, CheckCircle } from "lucide-react";
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
    mobileNumber: '9876543210',
    userName: 'Citizen User',
  },
  {
    id: 2,
    title: 'Drainage overflow',
    location: 'Church Street, Bangalore',
    date: '2023-03-28',
    status: 'ongoing',
    description: 'Drainage system is overflowing and causing bad smell and mosquitoes',
    images: ['/placeholder.svg'],
    mobileNumber: '9876543211',
    userName: 'Citizen User',
  },
  {
    id: 3,
    title: 'Broken street light',
    location: 'Brigade Road, Bangalore',
    date: '2023-03-25',
    status: 'completed',
    description: 'Street light has been broken for over a week causing safety concerns',
    images: ['/placeholder.svg'],
    mobileNumber: '9876543212',
    userName: 'Citizen User',
  },
  {
    id: 4,
    title: 'Water leakage on main road',
    location: 'Indiranagar, Bangalore',
    date: '2023-04-02',
    status: 'pending',
    description: 'Water pipe leakage causing water wastage and slippery road',
    images: ['/placeholder.svg'],
    mobileNumber: '9876543213',
    userName: 'Citizen User',
  },
];

const MunicipalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(mockComplaints);
  const [activeTab, setActiveTab] = useState('today');
  const [municipalCode, setMunicipalCode] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedMunicipalCode = localStorage.getItem('municipalCode');
    
    if (storedUserType !== 'municipal' || !storedMunicipalCode) {
      navigate('/login');
      return;
    }
    
    setMunicipalCode(storedMunicipalCode);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('municipalCode');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const getFilteredComplaints = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (activeTab === 'today') {
      return complaints.filter(c => c.date === today);
    } else if (activeTab === 'yesterday') {
      return complaints.filter(c => c.date === yesterday);
    } else if (activeTab === 'pending') {
      return complaints.filter(c => c.status === 'pending');
    } else if (activeTab === 'ongoing') {
      return complaints.filter(c => c.status === 'ongoing');
    } else if (activeTab === 'completed') {
      return complaints.filter(c => c.status === 'completed');
    }
    return complaints;
  };

  const filteredComplaints = activeTab === 'today' ? complaints : getFilteredComplaints();

  const updateComplaintStatus = (id: number, newStatus: 'pending' | 'ongoing' | 'completed') => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        return { ...complaint, status: newStatus };
      }
      return complaint;
    });
    
    setComplaints(updatedComplaints);
    
    const statusMessage = newStatus === 'completed' 
      ? 'Complaint marked as completed. Notification sent to citizen.' 
      : `Complaint status updated to ${newStatus}.`;
    
    toast.success(statusMessage);
  };

  const handleViewDetails = (id: number) => {
    toast.info(`Viewing details for complaint #${id}`);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="municipal" onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Municipal Dashboard</h1>
          <p className="text-gray-600">Welcome, Municipal Officer ({municipalCode})</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="today">Today's Complaints</TabsTrigger>
            <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-6">
              {filteredComplaints.map(complaint => (
                <Card key={complaint.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 bg-gray-200">
                      <ImageLoader 
                        src={complaint.images[0]} 
                        alt={complaint.title}
                        fallbackText={complaint.title} 
                      />
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{complaint.title}</h3>
                        <Badge className={`${statusColor(complaint.status)} px-3 py-1`}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1 text-clean-gray" />
                        {complaint.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <CalendarIcon className="h-4 w-4 mr-1 text-clean-gray" />
                        Reported on: {new Date(complaint.date).toLocaleDateString()}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{complaint.description}</p>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <p>Reported by: {complaint.userName}</p>
                        <p>Contact: {complaint.mobileNumber}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {complaint.status !== 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateComplaintStatus(complaint.id, 'pending')}
                          >
                            Mark as Pending
                          </Button>
                        )}
                        
                        {complaint.status !== 'ongoing' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-clean-blue text-clean-blue"
                            onClick={() => updateComplaintStatus(complaint.id, 'ongoing')}
                          >
                            Mark as Ongoing
                          </Button>
                        )}
                        
                        {complaint.status !== 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-clean-green text-clean-green"
                            onClick={() => updateComplaintStatus(complaint.id, 'completed')}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Mark as Completed
                          </Button>
                        )}
                        
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleViewDetails(complaint.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredComplaints.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
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

export default MunicipalDashboard;
