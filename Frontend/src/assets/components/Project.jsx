import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Medical Chatbot",
    subtitle: "AI-powered healthcare assistant",
    image: "/projects/doc.png",
    description:
      "Offline-capable voice assistant using Whisper, LangChain, Pinecone, and Mistral. Supports voice input, intent detection, RAG, and secure offline inference.",
    tech: ["React", "Whisper", "LangChain", "Pinecone", "Mistral"],
    github: "https://github.com/deep10dr/Mini-project",
    demo: "https://doc-assist-frontend.vercel.app/",
    deployedOn: "Vercel",
    struggles: "Integrating offline voice recognition with Whisper and ensuring secure local inference.",
    progress: "90% complete — core features stable, polishing UI and error handling.",
  },
  {
    title: "DreamSketch",
    subtitle: "Creative AI image generation app",
    image: "/projects/dream.png",
    description:
      "DreamSketch generates stunning images with Hugging Face models, using a React frontend and dynamic model-based Express backend.",
    tech: ["React", "Tailwind", "Hugging Face", "Express", "Flux"],
    github: "https://github.com/deep10dr/DreamSketch_Frontend",
    demo: "https://dream-sketch-phi.vercel.app/",
    deployedOn: "Vercel + Heroku",
    struggles: "Managing multiple backend models dynamically and handling large image generation requests.",
    progress: "80% complete — backend model switching and UI ready, adding user settings next.",
  },
  {
    title: "Face Finder",
    subtitle: "Real-time face detection & match",
    image: "/projects/face-finder.jpg",
    description:
      "Face authentication app using React, FastAPI, DeepFace. Capture and compare face embeddings with stored profiles.",
    tech: ["React", "FastAPI", "DeepFace", "FaceNet"],
    github: "https://github.com/deep10dr/Attendance",
    demo: "https://facefinder-demo.com",
    deployedOn: "Netlify + DigitalOcean",
    struggles: "Ensuring accurate real-time detection with minimal latency and handling diverse lighting conditions.",
    progress: "75% complete — face matching core done, improving UI and edge cases.",
  },
  {
    title: "Tragoudi",
    subtitle: "Ad-free web-based audio player",
    image: "/projects/tra.png",
    description:
      "Tragoudi is a sleek, ad-free audio player built with React, Tailwind CSS, and Supabase. Inspired by the limitations of free Spotify, it offers a custom music listening experience without interruptions.",
    tech: ["React", "Tailwind", "Supabase"],
    github: "https://github.com/deep10dr/Tragoudi",
    demo: "https://tragoudi.vercel.app/",
    deployedOn: "Vercel",
    struggles: "Syncing Supabase realtime data with UI and managing user playlists smoothly.",
    progress: "85% complete — playback and playlist management working, polishing UX.",
  },
  {
    title: "Palangal Nutrition Search",
    subtitle: "Know your fruits better 🍍",
    image: "/projects/pala.png",
    description:
      "A simple React app that uses the RapidAPI Nutrition API to provide nutritional facts about fruits. Built with Bootstrap and Axios.",
    tech: ["React", "Bootstrap", "Axios"],
    github: "https://github.com/deep10dr/palankal",
    demo: "https://palankal.netlify.app/",
    deployedOn: "Netlify",
    struggles: "API rate limiting and structuring dynamic search results clearly.",
    progress: "100% complete — stable and live.",
  },{
  title: "Calculator",
  subtitle: "Basic arithmetic calculator using HTML, CSS & JavaScript",
  image: "/projects/cal.png",  // replace with your actual image path
  description:
    "A simple calculator built from scratch using HTML, CSS, and JavaScript. Supports addition, subtraction, multiplication, and division with a clean and responsive interface.",
  tech: ["HTML", "CSS", "JavaScript"],
  github: "https://github.com/deep10dr/calculator",  // replace with your repo link if available
  demo: "https://deep10dr.github.io/calculator/",  // replace with your live demo URL if available
  deployedOn: "GitHub Pages / Netlify / Your platform",
  struggles: "Faced many challenges during the starting stage, including understanding event handling and DOM manipulation in JavaScript.",
  progress: "100% complete — fully functional and ready to showcase.",
}


];

function Project() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

  const project = projects[current];

  return (
    <div className="h-screen pt-20 px-4 lg:px-10 text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-[#66D3FA]">My Projects</h2>

      <div className="w-full h-[600px] relative flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="group relative max-w-6xl w-full h-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-xl bg-[#12343B]/30 backdrop-blur-md flex flex-col md:flex-row"
          >
            {/* Left: Text Section */}
            <div className="p-6 md:w-1/3 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-cyan-300">{project.title}</h3>
              <p className="text-sm text-gray-400 italic">{project.subtitle}</p>

              <div className="mt-4 text-gray-300 flex flex-col h-full">
                <p className="mb-2">{project.description}</p>

                <p className="font-semibold text-cyan-300">Technologies</p>
                <div className="flex flex-wrap gap-2 mb-4 mt-1">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-[#1F4E5F] text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* New Section: Deployment */}
                <div className="mb-4">
                  <p className="font-semibold text-cyan-300">Where I Deployed</p>
                  <p className="text-sm text-gray-400">{project.deployedOn}</p>
                </div>

                {/* New Section: Struggles */}
                <div className="mb-4">
                  <p className="font-semibold text-cyan-300">Struggles Faced</p>
                  <p className="text-sm text-gray-400">{project.struggles}</p>
                </div>

                {/* New Section: Progress */}
                <div className="mb-4">
                  <p className="font-semibold text-cyan-300">Progress of Completion</p>
                  <p className="text-sm text-gray-400">{project.progress}</p>
                </div>

                <div className="flex gap-4 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#12343B] hover:bg-[#1F4E5F] rounded-md text-sm transition duration-300"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#66D3FA] hover:bg-[#4cb8da] text-black rounded-md font-semibold text-sm transition duration-300"
                  >
                    <FiExternalLink /> Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="md:w-2/3 p-2 flex justify-center items-center">
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[600px] object-contain object-center"
              />
            </div>

            {/* Arrows only visible on hover */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A2E3A]/80 hover:bg-[#0D4C5C]/90 p-3 rounded-full text-white shadow-lg transition-transform hover:scale-110 z-10 hidden group-hover:block"
            >
              <FiChevronLeft size={36} />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A2E3A]/80 hover:bg-[#0D4C5C]/90 p-3 rounded-full text-white shadow-lg transition-transform hover:scale-110 z-10 hidden group-hover:block"
            >
              <FiChevronRight size={36} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Project;
