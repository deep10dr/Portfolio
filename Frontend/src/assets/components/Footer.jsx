import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaChevronUp, FaBars, FaPlus, FaMinus } from 'react-icons/fa';

function Footer() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <footer className="bg-[#0E8388] text-[#EEEEEE] py-4">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* Portfolio Information */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Deepak's Portfolio</h3>
          <p className="text-[#EEEEEE]">
            Passionate Full Stack Developer and AI Enthusiast building impactful applications using modern web technologies.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/deepak" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-[#EEEEEE] text-2xl hover:text-[#2E4F4F] transition duration-300" />
            </a>
            <a href="https://www.instagram.com/deepak" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#EEEEEE] text-2xl hover:text-[#2E4F4F] transition duration-300" />
            </a>
            <a href="https://github.com/deepak" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-[#EEEEEE] text-2xl hover:text-[#2E4F4F] transition duration-300" />
            </a>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="md:flex md:justify-between">
          
          {/* Links Section */}
        <div className="mb-6 md:mb-0">
  <div 
    onClick={() => setIsOpen1(!isOpen1)} 
    className="flex justify-between items-center cursor-pointer"
  >
    <h3 className="text-2xl font-bold mb-4">Links</h3>
    <div className='md:hidden'>{isOpen1 ? <FaMinus /> : <FaPlus />}</div>
  </div>
  <ul className={`${isOpen1 ? 'grid' : 'hidden'} md:grid grid-cols-2 gap-x-6 gap-y-2`}>
    <li><a href="#home" className="hover:text-[#2E4F4F]">Home</a></li>
    <li><a href="#about" className="hover:text-[#2E4F4F]">About</a></li>
    <li><a href="#projects" className="hover:text-[#2E4F4F]">Projects</a></li>
    <li><a href="#skills" className="hover:text-[#2E4F4F]">Skills</a></li>
    <li><a href="#contact" className="hover:text-[#2E4F4F]">Contact</a></li>
  </ul>
</div>


   


          {/* Contact Information Section */}
          <div>
            <div 
              onClick={() => setIsOpen3(!isOpen3)} 
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-4">Contact</h3>
              <div className='md:hidden'>{isOpen3 ? <FaMinus/> : <FaPlus/>}</div>
            </div>
            <ul className={`${isOpen3 ? 'block' : 'hidden'} md:block space-y-2`}>
              <li>Salem, Tamil Nadu</li>
              <li>deepakofficial81@gmail.com</li>
              <li>+91 8015744859</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-[#2E4F4F] pt-2 text-center relative">
        <p className="text-lg font-medium">
          &copy; {new Date().getFullYear()} Deepak. All Rights Reserved.
        </p>

        {/* Back to Top Button */}
        <div className="absolute right-4 bottom-6">
          <a href="#top">
            <button className="bg-[#2E4F4F] px-4 py-2 rounded-lg text-[#EEEEEE] hover:bg-[#3A5F5F] transition duration-300">
              <FaChevronUp />
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
