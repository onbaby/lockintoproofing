import React from "react";
import { PhoneCall, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomBar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-2 right-2 z-50 bg-white border border-blue-100 shadow-2xl flex items-stretch py-0 px-0 text-blue-900 w-[85vw] max-w-xs md:w-[30vw] md:max-w-md rounded-tl-2xl rounded-tr-2xl md:rounded-tl-3xl md:rounded-tr-3xl"
      role="navigation"
      aria-label="Quick actions"
      style={{ minWidth: '180px' }}
    >
      {/* Call */}
      <a
        href="tel:+14709151599"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-tl-2xl py-1 md:py-2"
        aria-label="Call us"
      >
        <PhoneCall className="h-5 w-5 md:h-6 md:w-6 mb-1" />
        <span className="text-xs font-semibold">Call</span>
      </a>
      {/* Divider */}
      <div className="h-8 w-px bg-gray-300 self-center" />
      {/* Text */}
      <a
        href="sms:+14709151599"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 py-1 md:py-2"
        aria-label="Text us"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mb-1" />
        <span className="text-xs font-semibold">Text</span>
      </a>
      {/* Divider */}
      <div className="h-8 w-px bg-gray-300 self-center" />
      {/* Email */}
      <a
        href="mailto:americantoproofingllc@gmail.com"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-tr-2xl py-1 md:py-2"
        aria-label="Email us"
      >
        <Mail className="h-5 w-5 md:h-6 md:w-6 mb-1" />
        <span className="text-xs font-semibold">Email</span>
      </a>
    </motion.nav>
  );
} 