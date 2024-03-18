import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 pb-4">
        <div className="flex items-center">
          {/* <img src="/logo.svg" alt="Company Logo" className="h-8 mr-2" /> */}
          <span className="text-xl font-semibold">ShopyBook</span>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0 sm:space-x-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ShopyBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;