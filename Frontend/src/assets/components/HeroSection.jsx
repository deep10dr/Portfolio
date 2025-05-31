import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

function HeroSection() {
  const words = ["Hello ,I'm Deepak S 👋", "Hi ,I'm Deepak S 👋", "Hey ,I'm Deepak S 👋 "];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typing and Deleting Animation Logic
  useEffect(() => {
    let timeout;

    const currentWord = words[currentWordIndex];

    if (!isDeleting && charIndex < currentWord.length) {
      // Typing logic
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentWord.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 100); // Typing speed
    } else if (isDeleting && charIndex > 0) {
      // Deleting logic
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 50); // Deleting speed (faster)
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Pause before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000); // 1-second pause before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to the next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div className='h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 gap-10 md:pt-24 '>
      
      {/* Profile Image with Fixed Container and Image Animation */}
      <div>
        <div className='w-68 h-78 md:w-80 md:h-100 rounded-4xl overflow-hidden shadow-2xl md:mt-1 mt-5'>
          <img 
            src='/IMG_2418.jpg' 
            alt='Deepak' 
            className='w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110 hover:rotate-3'
          />
        </div>
      </div>

      {/* Introduction with Animation */}
      <div className='md:w-[50%]  w-full'>
        <div className='text-center md:text-left text-[#EEEEEE] space-y-4 transform transition-all duration-1000 ease-in-out hover:translate-x-4'>
          
          {/* Typing Animation */}
          <h1 className='text-4xl md:text-5xl font-bold'>
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>

          <p className='text-2xl md:text-2xl animate__animated animate__fadeIn animate__delay-1s'>
            Full Stack Developer | AI Enthusiast
          </p>

          {/* Social Media Icons */}
          <div className='flex gap-6 mb-4 items-center justify-center md:justify-start  '>
            <a href="https://www.linkedin.com/in/deepak-s-dr" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-[#6fffe9] text-3xl hover:text-[#5bc0be] transition duration-300" />
            </a>
            <a href="https://www.instagram.com/deep_dr_46/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#6fffe9] text-3xl hover:text-[#5bc0be] transition duration-300" />
            </a>
            <a href="https://github.com/deep10dr" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-[#6fffe9] text-3xl hover:text-[#5bc0be] transition duration-300" />
            </a>
          </div>

         <div className='md:text-left text-center '>
           <a href="#projects">
            <button className='bg-[#14576D] text-[#EEEEEE] px-8 py-4 cursor-pointer rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:bg-[#1E758D] hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#1E758D]'>
              View My Work
            </button>
          </a>
         </div>

        </div>
      </div>
    </div>
  );
}

export default HeroSection;
