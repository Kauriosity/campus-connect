import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Footer from './Footer';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar setMobileMenuOpen={setMobileMenuOpen} />
      <MobileNav isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-8 lg:py-12">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 