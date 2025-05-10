import React from "react";
import { PhoneCall, Mail, MessageCircle } from "lucide-react";

export default function BottomBar() {
  return (
    <nav
      className="fixed bottom-0 right-0 z-50 bg-white border-t border-l shadow-2xl flex items-stretch py-0 px-0 text-blue-900 w-[90vw] max-w-sm md:w-[30vw] md:max-w-md rounded-tl-2xl rounded-tr-2xl md:rounded-tl-3xl md:rounded-tr-3xl"
      role="navigation"
      aria-label="Quick actions"
      style={{ minWidth: '220px' }}
    >
      {/* Call */}
      <a
        href="tel:+14709151599"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-tl-2xl py-2"
        aria-label="Call us"
      >
        <PhoneCall className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Call</span>
      </a>
      {/* Divider */}
      <div className="h-8 w-px bg-gray-300 self-center" />
      {/* Text */}
      <a
        href="sms:+14709151599"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 py-2"
        aria-label="Text us"
      >
        <MessageCircle className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Text</span>
      </a>
      {/* Divider */}
      <div className="h-8 w-px bg-gray-300 self-center" />
      {/* Email */}
      <a
        href="mailto:americantoproofingllc@gmail.com"
        className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-100 rounded-tr-2xl py-2"
        aria-label="Email us"
      >
        <Mail className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Email</span>
      </a>
    </nav>
  );
} 