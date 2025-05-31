import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = {
  Frontend: [
    { name: "React", icon: "https://cdn-icons-png.flaticon.com/128/1172/1172027.png", history: "I was using plain HTML which was very slow, so I chose to learn React for better performance." },
    { name: "Tailwind CSS", icon: "/tailwind-css.png", history: "Tailwind CSS helped me write utility-first styles and build responsive designs faster." },
    { name: "Bootstrap", icon: "/bootstrap.png", history: "I used Bootstrap to quickly prototype responsive layouts before moving to Tailwind." },
    { name: "HTML", icon: "https://cdn-icons-png.flaticon.com/128/1051/1051277.png", history: "HTML is the foundation of web development; I started my journey by mastering it." },
    { name: "CSS", icon: "https://cdn-icons-png.flaticon.com/128/732/732190.png", history: "I learned CSS to design and style beautiful interfaces for web apps." },
    { name: "JavaScript", icon: "javascript-.png", history: "JavaScript enabled me to add dynamic interactions and logic to my websites." },
  ],
  Backend: [
    { name: "Express", icon: "/ex.png", history: "I use Express for building RESTful APIs efficiently with Node.js." },
    { name: "Node.js", icon: "/node.png", history: "Node.js powers my backend with non-blocking I/O and JavaScript runtime." },
    { name: "FastAPI", icon: "https://fastapi.tiangolo.com/img/icon-white.svg", history: "I chose FastAPI for high-performance Python APIs, especially with ML models." },
  ],
  Database: [
    { name: "MongoDB", icon: "/mongoDb.png", history: "MongoDB fits well with my full-stack apps due to its flexibility with JSON-like data." },
    { name: "Supabase", icon: "/supabase.png", history: "Supabase is my go-to for quick and scalable Postgres-based backends." },
    { name: "Pinecone", icon: "/Pinecone.png", history: "I use Pinecone to handle vector databases for AI-powered search and retrieval." },
  ],
  Tools: [
    { name: "VS Code", icon: "/vs.png", history: "VS Code is my main code editor for almost all development work." },
    { name: "Jupyter", icon: "/jupyter.png", history: "Jupyter helps me visualize and test Python and ML models interactively." },
    { name: "Git", icon: "https://cdn-icons-png.flaticon.com/128/5968/5968853.png", history: "Git helps me manage version control efficiently across all my projects." },
    { name: "GitHub", icon: "https://cdn-icons-png.flaticon.com/128/4926/4926624.png", history: "I use GitHub to collaborate, store, and deploy my open-source and private projects." },
    { name: "Sublime Text", icon: "https://imgs.search.brave.com/BDPmT3rb6mPH2GwbKwx24ahDa-kMgEvPuZz7oWd7nCU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi83Lzc5L0Jy/ZWV6ZWljb25zLWFw/cHMtNDgtc3VibGlt/ZS10ZXh0LnN2Zy8y/NTBweC1CcmVlemVp/Y29ucy1hcHBzLTQ4/LXN1YmxpbWUtdGV4/dC5zdmcucG5n", history: "Sublime Text was my early editor before moving to VS Code for better extensions." },
  ],
  "AI & ML": [
    { name: "LangChain", icon: "/Langchain.png", history: "LangChain enables me to orchestrate LLM workflows efficiently in my AI applications." },
    { name: "Mistral LLM", icon: "", history: "Mistral, an open-source LLM, powers the core response generation in my AI chatbots." },
    { name: "Whisper", icon: "", history: "Whisper provides real-time and offline speech-to-text capabilities for voice interfaces." },
    { name: "Hugging Face Embeddings", icon: "", history: "I use Hugging Face Embeddings for semantic search and vector representation of text." },
    { name: "DeepFace", icon: "", history: "DeepFace helps me implement accurate face recognition features in secure systems." },
    { name: "FFmpeg", icon: "", history: "FFmpeg is integral to my audio preprocessing workflows for ML and voice applications." },
  ],
  "Programming Languages": [
    { name: "Java", icon: "https://cdn-icons-png.flaticon.com/128/226/226777.png", history: "I learned Java for strong OOP concepts and competitive programming." },
    { name: "Python", icon: "https://cdn-icons-png.flaticon.com/128/1822/1822899.png", history: "Python is my go-to for AI/ML, backend APIs, and data science." },
    { name: "C", icon: "https://img.icons8.com/?size=96&id=40670&format=png", history: "C helped me understand memory, pointers, and system-level programming." },
  ],
};

const categories = Object.keys(skillsData);

export default function Skills() {
  const [selected, setSelected] = useState(categories[0]);

  return (
    <div className="min-h-screen p-8  flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 p-6 rounded-xl shadow-2xl">
        {/* Left Section */}
        <div className="md:w-2/3 w-full">
          <h2 className="text-3xl font-bold text-white mb-6">{selected} Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {skillsData[selected].map(({ name, icon, history }, i) => (
                <motion.div
                  key={name}
                  className="relative group bg-gradient-to-r from-[#133B47] to-[#1F5C6C] p-4 rounded-md shadow-md border border-transparent hover:border-[#40CFFF] transition-all duration-300 overflow-hidden h-32 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  {/* Normal Content */}
                  <div className="flex flex-col items-center text-white group-hover:opacity-20 transition-opacity duration-300">
                    <img
                      src={icon.length > 0 ? icon : "https://cdn-icons-gif.flaticon.com/11681/11681521.gif"}
                      alt={name}
                      className="h-[30px] mb-2"
                    />
                    <h3 className="text-lg font-semibold">{name}</h3>
                  </div>
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-[#0A2E3A]/90 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 outline-none">
                    <p className="text-sm font-medium text-[#d9d9d9]">{history}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 w-full text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Choose Category</h3>
          <div className="flex flex-col items-center space-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`w-44 text-sm font-medium py-2 px-4 rounded-md shadow transition-all duration-300 ${
                  selected === cat
                    ? "bg-gradient-to-r from-[#3FD3DB] to-[#188CA1] text-white scale-105"
                    : "bg-[#0D4C5C] text-gray-300 hover:bg-gradient-to-r hover:from-[#1F6D78] hover:to-[#3FD3DB] hover:text-white hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
