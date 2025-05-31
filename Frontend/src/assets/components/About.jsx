import React from 'react';

function About() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Deepak_Resume.pdf'; // Make sure this file exists in public folder
    link.download = 'Deepak_Resume.pdf';
    link.click();
  };

  return (
    <div
      id="about"
      className="min-h-screen text-white flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl w-full space-y-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#66D3FA] border-b-4 border-[#1E758D] inline-block pb-2 animate-fade-in-left">
          About Me
        </h2>

        {/* Main Text */}
        <div className="space-y-6 text-lg md:text-xl text-gray-200 leading-relaxed animate-fade-in-up">
          <p>
            Hello! I'm <span className="text-[#88E0EF] font-semibold">Deepak</span>, a Full Stack Developer & AI Enthusiast. I specialize in building clean, scalable, and intelligent web applications using technologies like React, Node.js, and Python.
          </p>
          <p>
            I love solving real-world problems through intuitive UI and efficient backend systems. My curiosity drives me to keep learning, especially in the evolving world of AI and large language models.
          </p>
          <p>
            Whether it's designing responsive frontends, building RESTful APIs, or experimenting with AI workflows—I’m always up for a challenge that pushes my limits.
          </p>
          <p className="italic text-sm text-gray-400">
            “Tech isn’t just my career—it’s my canvas for creativity.”
          </p>
        </div>

        {/* Resume Button */}
        <div className="pt-4">
          <button
            onClick={handleDownload}
            className="bg-[#1E758D] hover:bg-[#2299B9] text-white px-6 py-3 rounded-full font-medium shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
