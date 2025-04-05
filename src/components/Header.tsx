
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, MapPin } from "lucide-react";

type HeaderProps = {
  userType?: 'citizen' | 'municipal' | null;
  onLogout?: () => void;
};

const Header: React.FC<HeaderProps> = ({ userType, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem('userType');
    localStorage.removeItem('userMobile');
    localStorage.removeItem('municipalCode');
    navigate('/');
  };

  return (
    <header className="bg-clean-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Clean City Connect</span>
        </Link>

        <div className="flex items-center space-x-4">
          {userType ? (
            <>
              {userType === 'citizen' && (
                <div className="flex items-center space-x-4">
                  <Link to="/complaints" className="text-white hover:text-blue-100">
                    <MessageSquare className="h-5 w-5" />
                  </Link>
                  <Link to="/notifications" className="text-white hover:text-blue-100">
                    <Bell className="h-5 w-5" />
                  </Link>
                  <Link to="/map" className="text-white hover:text-blue-100">
                    <MapPin className="h-5 w-5" />
                  </Link>
                </div>
              )}
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-blue-700" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
