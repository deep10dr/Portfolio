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
    github: "https://github.com/your-username/medical-chatbot",
    demo: "https://medical-chatbot-demo.com",
  },
  {
    title: "DreamSketch",
    subtitle: "Creative AI image generation app",
    image: "/projects/dream.png",
    description:
      "DreamSketch generates stunning images with Hugging Face models, using a React frontend and dynamic model-based Express backend.",
    tech: ["React", "Tailwind", "Hugging Face", "Express", "Flux"],
    github: "https://github.com/your-username/dreamsketch",
    demo: "https://dreamsketch-demo.com",
  },
  {
    title: "Face Finder",
    subtitle: "Real-time face detection & match",
    image: "/projects/face-finder.jpg",
    description:
      "Face authentication app using React, FastAPI, DeepFace. capture, and compares face embeddings with stored profiles.",
    tech: ["React", "FastAPI", "DeepFace", "FaceNet"],
    github: "https://github.com/your-username/face-finder",
    demo: "https://facefinder-demo.com",
  },
];

function Project() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

  const project = projects[current];

  return (
    <div className="min-h-screen py-20 px-4 text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-[#66D3FA]"> My Projects</h2>

      <div className="w-full max-w-5xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="group relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-xl bg-[#12343B]/30 backdrop-blur-md"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-bold text-cyan-300">{project.title}</h3>
              <p className="text-sm text-gray-400 italic">{project.subtitle}</p>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0f1f26]/90 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col p-6 rounded-xl">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-[#1F4E5F] text-cyan-100"
                  >
                    {tech}
                  </span>
                ))}
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
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="flex justify-between items-center mt-6 px-6">
          <button
            onClick={prev}
            className="text-white hover:text-[#66D3FA] transition-transform hover:scale-110"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="text-white hover:text-[#66D3FA] transition-transform hover:scale-110"
          >
            <FiChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
