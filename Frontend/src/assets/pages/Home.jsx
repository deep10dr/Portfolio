import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/About';
import Projects from '../components/Project';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../style/LineBackground.css'

function Home() {
  return (
    <div className="relative w-full overflow-x-hidden min-h-screen animated-bg">
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* About Me Section */}
        <section id="about" >
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
    </div>
  );
}


export default Home;
