import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields.');
      return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      const res = await axios.post('https://portfolio-production-2464.up.railway.app/send-email', formData);

      if (res.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <ToastContainer position="bottom-center" />
      <div className="w-full max-w-2xl backdrop-blur-sm bg-white/10 p-10 rounded-3xl shadow-2xl space-y-8">
        <h2 className="text-4xl font-bold text-[#00D9FF] text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 shadow-md">
            <FaUser className="text-[#00D9FF] text-2xl" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>
          {/* Email */}
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 shadow-md">
            <FaEnvelope className="text-[#00D9FF] text-2xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              required
              disabled={loading}
            />
          </div>
          {/* Message */}
          <div className="flex gap-4 bg-white/5 rounded-2xl p-4 shadow-md">
            <FaComment className="text-[#00D9FF] text-2xl mt-1" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400 resize-none"
              required
              disabled={loading}
            />
          </div>
          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-[#00D9FF] text-[#0A2E3A] text-lg font-semibold rounded-full shadow-md hover:bg-[#00b9dd] transition duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
