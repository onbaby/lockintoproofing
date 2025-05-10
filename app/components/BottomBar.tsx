import React from "react";
import { PhoneCall, Mail, MessageCircle } from "lucide-react";

export default function BottomBar() {
  return (
    <nav
      className="fixed bottom-0 right-0 z-50 bg-white border-t border-l shadow-2xl flex justify-around items-center py-2 px-2 md:px-8 gap-2 md:gap-8 text-blue-900 w-[90vw] max-w-sm md:w-[30vw] md:max-w-md rounded-tl-2xl rounded-tr-2xl md:rounded-tl-3xl md:rounded-tr-3xl"
      role="navigation"
      aria-label="Quick actions"
      style={{ minWidth: '220px' }}
    >
      <a
        href="tel:+14709151599"
        className="flex flex-col items-center justify-center hover:text-blue-600 transition-colors"
        aria-label="Call us"
      >
        <PhoneCall className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Call</span>
      </a>
      <a
        href="sms:+14709151599"
        className="flex flex-col items-center justify-center hover:text-blue-600 transition-colors"
        aria-label="Text us"
      >
        <MessageCircle className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Text</span>
      </a>
      <a
        href="mailto:americantoproofingllc@gmail.com"
        className="flex flex-col items-center justify-center hover:text-blue-600 transition-colors"
        aria-label="Email us"
      >
        <Mail className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Email</span>
      </a>
    </nav>
  );
} 