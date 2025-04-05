
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, ArrowLeft } from "lucide-react";
import { toast } from 'sonner';
import Header from './Header';
import Footer from './Footer';

const NewComplaint: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType !== 'citizen') {
      navigate('/login');
      return;
    }

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          // In a real app, we would use a reverse geocoding API to get the address
          // For demo, we'll just set a placeholder location
          setLocation('Current Location (detected)');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not detect your location. Please enter it manually.');
        }
      );
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (images.length + newFiles.length > 3) {
        toast.error('You can only upload up to 3 images');
        return;
      }

      setImages([...images, ...newFiles]);

      // Create preview URLs
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      // In a real app, we would send the form data to the API
      console.log('Submitting complaint:', {
        title,
        description,
        location,
        userLocation,
        images: images.map(img => img.name)
      });
      
      setIsSubmitting(false);
      toast.success('Complaint submitted successfully');
      navigate('/citizen-dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header userType="citizen" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-gray-600"
          onClick={() => navigate('/citizen-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Report a New Issue</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief title for your complaint"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the issue"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex">
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Address or landmark"
                    className="flex-grow"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    className="ml-2"
                    onClick={() => {
                      if (userLocation) {
                        setLocation('Current Location (detected)');
                        toast.success('Using your current location');
                      } else {
                        toast.error('Could not detect your location');
                      }
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Upload Images</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/9b87f5/white?text=Image+Preview';
                          target.onerror = null;
                        }}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 3 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-24 cursor-pointer hover:border-clean-blue transition-colors">
                      <div className="text-center">
                        <Camera className="mx-auto h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        multiple={images.length < 2}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload up to 3 images (optional)
                </p>
              </div>
            </form>
          </CardContent>
          
          <CardFooter>
            <div className="flex justify-end w-full">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate('/citizen-dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewComplaint;
