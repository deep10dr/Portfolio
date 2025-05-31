import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/About';
import Projects from '../components/Project';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-[#0A2E3A] via-[#125E75] to-[#0D4C5C] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Me Section */}
      <section id="about">
        <AboutMe />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
