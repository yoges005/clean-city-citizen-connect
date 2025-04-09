
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageLoader from '@/components/ImageLoader';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-clean-blue to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center md:text-left md:flex items-center">
            <div className="md:w-1/2 pb-10 md:pb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Clean City Citizen Connect
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-in-left">
                Empowering citizens to collaborate with municipal corporations for a cleaner India
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-clean-blue hover:bg-blue-50 hover-scale"
                  onClick={() => navigate('/login')}
                >
                  Login / Register
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-blue-700 hover-scale"
                  onClick={() => {
                    const howItWorksSection = document.getElementById('how-it-works');
                    if (howItWorksSection) {
                      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-md h-auto rounded-lg shadow-lg animate-float">
                <ImageLoader 
                  src="/placeholder.svg" 
                  alt="Clean City Initiative" 
                  className="max-w-full h-auto rounded-lg"
                  fallbackText="Clean+City+Initiative"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Our Platform Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="clean-card hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-clean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Easy Complaint Registration</h3>
                  <p className="text-gray-600 text-center">
                    Quickly report cleanliness issues with photos and location details.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="clean-card hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-clean-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Real-time Status Updates</h3>
                  <p className="text-gray-600 text-center">
                    Track your complaint status from submission to resolution.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="clean-card hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-orange-100 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-clean-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">Location Tracking</h3>
                  <p className="text-gray-600 text-center">
                    Precise location detection for accurate complaint mapping.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center animate-scale-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-20 h-20 rounded-full bg-clean-blue text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold animate-bounce-subtle">1</div>
                <h3 className="text-xl font-semibold mb-2">Register & Login</h3>
                <p className="text-gray-600">Sign in with your mobile number and OTP verification.</p>
              </div>
              
              <div className="text-center animate-scale-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-20 h-20 rounded-full bg-clean-blue text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold animate-bounce-subtle">2</div>
                <h3 className="text-xl font-semibold mb-2">Report Issue</h3>
                <p className="text-gray-600">Submit details with photos and your location.</p>
              </div>
              
              <div className="text-center animate-scale-up" style={{ animationDelay: '0.5s' }}>
                <div className="w-20 h-20 rounded-full bg-clean-blue text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold animate-bounce-subtle">3</div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Follow the status updates of your complaint.</p>
              </div>
              
              <div className="text-center animate-scale-up" style={{ animationDelay: '0.7s' }}>
                <div className="w-20 h-20 rounded-full bg-clean-blue text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold animate-bounce-subtle">4</div>
                <h3 className="text-xl font-semibold mb-2">Problem Resolved</h3>
                <p className="text-gray-600">Get notified when the issue is fixed.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                size="lg" 
                className="bg-clean-blue hover:bg-blue-700 hover-scale animate-pulse-glow"
                onClick={() => navigate('/login')}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold text-clean-blue mb-2 animate-pulse-glow">5000+</div>
                <p className="text-gray-300">Issues Resolved</p>
              </div>
              
              <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold text-clean-blue mb-2 animate-pulse-glow">10+</div>
                <p className="text-gray-300">Cities Covered</p>
              </div>
              
              <div className="animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
                <div className="text-4xl font-bold text-clean-blue mb-2 animate-pulse-glow">98%</div>
                <p className="text-gray-300">Resolution Rate</p>
              </div>
              
              <div className="animate-slide-in-left" style={{ animationDelay: '0.7s' }}>
                <div className="text-4xl font-bold text-clean-blue mb-2 animate-pulse-glow">24h</div>
                <p className="text-gray-300">Avg. Response Time</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
