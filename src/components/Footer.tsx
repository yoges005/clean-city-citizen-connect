
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-clean-blue text-white mt-auto py-6 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Municipal Corporation of India</h3>
            <p className="text-sm text-blue-100 dark:text-gray-300">
              A platform connecting citizens with municipal corporations for a cleaner India.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-blue-100 hover:text-white dark:text-gray-300 dark:hover:text-white">Home</a></li>
              <li><a href="/about" className="text-blue-100 hover:text-white dark:text-gray-300 dark:hover:text-white">About</a></li>
              <li><a href="/contact" className="text-blue-100 hover:text-white dark:text-gray-300 dark:hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-sm text-blue-100 dark:text-gray-300 not-italic">
              Municipal Corporation of India<br />
              New Delhi, India<br />
              Email: support@cleancity.gov.in<br />
              Phone: +91 1234567890
            </address>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-blue-400 dark:border-gray-700 text-sm text-center text-blue-100 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Municipal Corporation of India. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
