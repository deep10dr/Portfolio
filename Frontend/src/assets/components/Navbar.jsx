import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { CiMenuBurger } from 'react-icons/ci';
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About Me' },
    { to: 'skills', label: 'Skills' },
    { to: 'projects', label: 'Projects' },
    { to: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0A2E3A]/90 text-[#F0F8FF] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer select-none">
          Deepak's Portfolio
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center font-bold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-[#19A7CE] transition duration-300 text-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-3xl focus:outline-none cursor-pointer text-[#F0F8FF]"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <IoMdClose /> : <CiMenuBurger />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-[#0A2E3A] md:hidden absolute w-full left-0 transition-all duration-300 font-bold ${isMenuOpen ? 'flex flex-col items-center space-y-4 py-4' : 'hidden'}`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-[#19A7CE] transition duration-300 text-lg text-[#F0F8FF]"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
